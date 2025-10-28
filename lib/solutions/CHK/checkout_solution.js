"use strict";

const priceTable = {
	A: {
		unitPrice: 50,
		offers: [
			{ quantity: 5, price: 200 },
			{ quantity: 3, price: 130 },
		],
	},
	B: {
		unitPrice: 30,
		offers: [{ quantity: 2, price: 45 }],
	},
	C: { unitPrice: 20, offers: [] },
	D: { unitPrice: 15, offers: [] },
};

const validateSkus = (skus) => {
	if (typeof skus !== "string") {
		return false;
	}

	const validSkuKeys = Object.keys(priceTable);
	const chars = [...skus];

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
			if (!priceTable[char]) {
				return 0; // invalid SKU
			}
			itemCounts[char] = (itemCounts[char] || 0) + 1;
		}

		let total = 0;

		for (const [sku, count] of Object.entries(itemCounts)) {
			const { unitPrice, offers } = priceTable[sku];
			let remaining = count;
			let subtotal = 0;

			// check offers first
			for (const { quantity, price } of offers) {
				const deals = Math.floor(remaining / quantity);
				subtotal += deals * price;
				remaining -= deals * quantity;
			}

			// add remaining items at unit price
			subtotal += remaining * unitPrice;

			total += subtotal;
		}

		return total;
	}
}

module.exports = CheckoutSolution;




