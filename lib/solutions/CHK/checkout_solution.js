"use strict";

const priceTable = {
	A: {
		unitPrice: 50,
		offers: [
			{ type: "bulk", quantity: 3, price: 130 },
			{ type: "bulk", quantity: 5, price: 200 },
		],
	},
	B: {
		unitPrice: 30,
		offers: [{ type: "bulk", quantity: 2, price: 45 }],
	},
	C: { unitPrice: 20, offers: [] },
	D: { unitPrice: 15, offers: [] },
	E: {
		unitPrice: 40,
		offers: [],
		freeItemOffers: [{ buyQuantity: 2, freeSku: "B", freeQuantity: 1 }],
	},
};

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
				if (itemCounts[freeSku]) {
					const numFree = Math.floor(count / buyQuantity) * freeQuantity;
					itemCounts[freeSku] = Math.max(0, itemCounts[freeSku] - numFree);
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








