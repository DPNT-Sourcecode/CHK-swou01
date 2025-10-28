export const priceTable = {
	A: {
		unitPrice: 50,
		offers: [
			{ type: "bulk", quantity: 5, price: 200 },
			{ type: "bulk", quantity: 3, price: 130 },
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
	F: {
		unitPrice: 10,
		offers: [],
		freeItemOffers: [{ buyQuantity: 2, freeSku: "F", freeQuantity: 1 }],
	},
	G: { unitPrice: 20, offers: [] },
	H: {
		unitPrice: 10,
		offers: [
			{ type: "bulk", quantity: 10, price: 80 },
			{ type: "bulk", quantity: 5, price: 45 },
		],
	},
	I: { unitPrice: 35, offers: [] },
	J: { unitPrice: 60, offers: [] },
	K: {
		unitPrice: 80,
		offers: [{ type: "bulk", quantity: 2, price: 150 }],
	},
	L: { unitPrice: 90, offers: [] },
	M: { unitPrice: 15, offers: [] },
	N: {
		unitPrice: 40,
		offers: [],
		freeItemOffers: [{ buyQuantity: 3, freeSku: "M", freeQuantity: 1 }],
	},
	O: { unitPrice: 10, offers: [] },
	P: {
		unitPrice: 50,
		offers: [{ type: "bulk", quantity: 5, price: 200 }],
	},
	Q: {
		unitPrice: 30,
		offers: [{ type: "bulk", quantity: 3, price: 80 }],
	},
	R: {
		unitPrice: 50,
		offers: [],
		freeItemOffers: [{ buyQuantity: 3, freeSku: "Q", freeQuantity: 1 }],
	},
	S: { unitPrice: 30, offers: [] },
	T: { unitPrice: 20, offers: [] },
	U: {
		unitPrice: 40,
		offers: [],
		freeItemOffers: [{ buyQuantity: 3, freeSku: "U", freeQuantity: 1 }],
	},
	V: {
		unitPrice: 50,
		offers: [
			{ type: "bulk", quantity: 3, price: 130 },
			{ type: "bulk", quantity: 2, price: 90 },
		],
	},
	W: { unitPrice: 20, offers: [] },
	X: { unitPrice: 90, offers: [] },
	Y: { unitPrice: 10, offers: [] },
	Z: { unitPrice: 50, offers: [] },
};
