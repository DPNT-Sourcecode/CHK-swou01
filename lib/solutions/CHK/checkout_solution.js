"use strict";

const priceTable = {
	A: {
		unitPrice: 50,
		offers: [{ type: "bulk", quantity: 3, price: 130 }],
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

	if (skus.length === 0) {
		return true;
	}

	const validSkuKeys = Object.keys(priceTable);
	const chars = [...skus];

	// Allow strings with at least one valid SKU character
	const hasValidChar = chars.some((char) => validSkuKeys.includes(char));

	return hasValidChar;
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

		for (const [sku, count] of Object.entries(itemCounts)) {
			const { unitPrice, offers = [] } = priceTable[sku];
			let remaining = count;
			let subtotal = 0;

			// Apply bulk offers first
			for (const { quantity, price } of offers) {
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



