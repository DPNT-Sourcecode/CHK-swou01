var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const CheckoutSolution = require("../../../lib/solutions/CHK/checkout_solution");

describe("CHK challenge: supermarket checkout", function () {
	const checkout = new CheckoutSolution();
	describe("Input validation", function () {
		it("returns -1 for non-string input", function () {
			assert.equal(checkout.checkout(0), -1);
		});

		it("returns -1 for completely invalid SKU string", function () {
			assert.equal(checkout.checkout("-"), -1);
		});

		it("returns -1 if string contains at least one invalid SKU", function () {
			assert.equal(checkout.checkout("A-"), -1);
		});
	});

	describe("Basic pricing", function () {
		it("calculates total price for single units", function () {
			// A(50) + B(30) + C(20) + D(15) = 115
			assert.equal(checkout.checkout("ABCD"), 50 + 30 + 20 + 15);
		});

		it("returns 0 for empty string input", function () {
			assert.equal(checkout.checkout(""), 0);
		});
	});

	describe("Special offers", function () {
		it("applies bulk offers correctly for A and B", function () {
			assert.equal(checkout.checkout("AAA"), 130); // 3-for-130
			assert.equal(checkout.checkout("AAAAA"), 200); // 5-for-200
			assert.equal(checkout.checkout("AAAAABBCD"), 280); // Mixed units with offers
		});
	});

	describe("Free item offers", function () {
		it("applies E -> B free offers correctly", function () {
			assert.equal(checkout.checkout("EEB"), 80); // 2 E + 1 free B
			assert.equal(checkout.checkout("EEEEBB"), 160); // 4 E + 2 free B
		});

		it("applies F → F free correctly for 3 Fs", function () {
			assert.equal(checkout.checkout("FFF"), 20); // 2 charged, 1 free
		});

		it("does not give free F if fewer than 3 in basket", function () {
			// Buy 2 Fs → free item requires 3, so no free F
			// Total = 2 * 10 = 20
			assert.equal(new CheckoutSolution().checkout("FF"), 20);
		});
	});

	describe("Overlapping bulk offers", function () {
		it("calculates optimal total for multiple A's with overlapping offers", function () {
			assert.equal(checkout.checkout("AAAAAA"), 250); // 6 A's
			assert.equal(checkout.checkout("AAAAAAA"), 300); // 7 A's
			assert.equal(checkout.checkout("AAAAAAAA"), 330); // 8 A's
		});
	});

	describe("Group offers", function () {
		it("applies group offer for S, T, X, Y, Z correctly", function () {
			// S(20) + T(20) + X(17) = 57 → group offer price = 45
			assert.equal(checkout.checkout("STX"), 45);

			// S(20) + T(20) + X(17) + Y(20) = 77
			// Apply group offer once (3 items for 45), remaining Y(20) + Z(21)
			// Total = 45 + 20 + 21 = 86
			assert.equal(checkout.checkout("STXYZ"), 82);

			// 2 * S(20) + 2 * T(20) + 2 * X(17) = 114
			// Apply group offer twice (6 items for 90)
			assert.equal(checkout.checkout("SSTTXX"), 90);
		});
	});
});
