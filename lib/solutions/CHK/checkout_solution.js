"use strict";
const priceTable = require("./price_table");
const groupOffers = require("./group_offers");

const validateSkus = (skus) => {
	if (typeof skus !== "string") {
		return false;
	}

	// Empty string is valid
	if (skus.length === 0) return true;

	const validSkuKeys = Object.keys(priceTable);

	// Check that every character is a valid SKU
	return [...skus].every((char) => validSkuKeys.includes(char));
};

class CheckoutSolution {
	checkout(skus) {
		if (!validateSkus(skus)) {
			return -1;
		}

		const itemCounts = {};
		for (const char of skus) {
			if (priceTable[char]) {
				itemCounts[char] = (itemCounts[char] || 0) + 1;
			}
		}

		let total = 0;
		for (const offer of groupOffers) {
			const { skus: groupSkus, quantity, price } = offer;

			// Build list of eligible items in basket
			const eligible = [];
			for (const sku of groupSkus) {
				for (let i = 0; i < (itemCounts[sku] || 0); i++) {
					eligible.push(sku);
				}
			}

			// Sort descending by unit price to favor customer
			eligible.sort(
				(a, b) => priceTable[b].unitPrice - priceTable[a].unitPrice,
			);

			// Apply group offer repeatedly
			while (eligible.length >= quantity) {
				total += price;
				for (let i = 0; i < quantity; i++) {
					const used = eligible.shift();
					itemCounts[used] -= 1; // remove from basket
				}
			}
		}

		// Apply free-item offers
		for (const [sku, count] of Object.entries(itemCounts)) {
			const { freeItemOffers = [] } = priceTable[sku];

			for (const { buyQuantity, freeSku, freeQuantity } of freeItemOffers) {
				if (freeSku === sku) {
					// self-referential free-item offer (e.g., F -> F)
					const groupSize = buyQuantity + freeQuantity;
					const numGroups = Math.floor(count / groupSize);
					const numFree = numGroups * freeQuantity;
					itemCounts[sku] = count - numFree;
				} else {
					// standard free-item offer
					const numFree = Math.floor(count / buyQuantity) * freeQuantity;
					if (itemCounts[freeSku]) {
						itemCounts[freeSku] = Math.max(0, itemCounts[freeSku] - numFree);
					}
				}
			}
		}

		// Calculate total with bulk offers applied largest-first
		for (const [sku, count] of Object.entries(itemCounts)) {
			const { unitPrice, offers = [] } = priceTable[sku];
			let remaining = count;
			let subtotal = 0;

			// Sort offers ascending by price-per-unit for best deal
			const sortedOffers = [...offers].sort(
				(a, b) => a.price / a.quantity - b.price / b.quantity,
			);

			for (const { quantity, price } of sortedOffers) {
				const deals = Math.floor(remaining / quantity);
				subtotal += deals * price;
				remaining -= deals * quantity;
			}

			subtotal += remaining * unitPrice;
			total += subtotal;
		}

		return total;
	}
}

module.exports = CheckoutSolution;
