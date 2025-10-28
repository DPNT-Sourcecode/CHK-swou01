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
			itemCounts[char] = (itemCounts[char] || 0) + 1;
		}

		let total = 0;
		// Apply group offers
		for (const offer of groupOffers) {
			const { skus: groupSkus, quantity, price } = offer;

			// Build eligible items list
			const eligible = [];
			for (const sku of groupSkus) {
				eligible.push(...Array(itemCounts[sku] || 0).fill(sku));
			}

			// Sort descending by unit price to favor customer
			eligible.sort(
				(a, b) => priceTable[b].unitPrice - priceTable[a].unitPrice,
			);

			// Apply group offer repeatedly
			const groups = Math.floor(eligible.length / quantity);
			total += groups * price;

			// Remove used items from counts
			for (let i = 0; i < groups * quantity; i++) {
				itemCounts[eligible[i]]--;
			}
		}

		// Apply free-item offers
		for (const [sku, count] of Object.entries(itemCounts)) {
			const { freeItemOffers = [] } = priceTable[sku];

			for (const { buyQuantity, freeSku, freeQuantity } of freeItemOffers) {
				if (freeSku === sku) {
					// Self-referential free-item offer (e.g., F -> F)
					const groupSize = buyQuantity + freeQuantity;
					const numGroups = Math.floor(count / groupSize);
					const numFree = numGroups * freeQuantity;
					itemCounts[sku] = count - numFree;
				} else {
					// Standard free-item offer
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

			// Sort offers descending by price-per-unit to favor customer
			const sortedOffers = [...offers].sort(
				(a, b) => b.price / b.quantity - a.price / a.quantity,
			);

			for (const { quantity, price } of sortedOffers) {
				const deals = Math.floor(remaining / quantity);
				subtotal += deals * price;
				remaining -= deals * quantity;
			}

			// Add remaining units at unit price
			subtotal += remaining * unitPrice;
			total += subtotal;
		}

		return total;
	}
}

module.exports = CheckoutSolution;


