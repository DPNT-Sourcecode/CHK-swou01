"use strict";
import { priceTable } from "./price_table.js";

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
		let total = 0;
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



