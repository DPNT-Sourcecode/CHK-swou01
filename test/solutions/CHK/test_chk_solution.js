var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const CheckoutSolution = require("../../../lib/solutions/CHK/checkout_solution");

describe("CHK challenge: supermarket checkout", function () {
	it("returns -1 for invalid input type", function () {
		assert.equal(new CheckoutSolution().checkout(0), -1);
	});

	it("returns -1 for invalid SKU characters", function () {
		assert.equal(new CheckoutSolution().checkout("-"), -1);
	});

	it("does not allow strings with at least one invalid SKU character", function () {
		assert.equal(new CheckoutSolution().checkout("A-"), -1);
	});

	it("correctly calculates total price for unit costs", function () {
		// the sum of A(50) + B(30) + C(20) + D(15) = 115
		const singleUnitTotal = 50 + 30 + 20 + 15;
		assert.equal(new CheckoutSolution().checkout("ABCD"), singleUnitTotal);
	});

	it("applies special offers correctly", function () {
		// 3 A's for 130 instead of 150
		assert.equal(new CheckoutSolution().checkout("AAA"), 130);

		// 5 A's for 200 instead of 250: 3 for 130 + 2 at 50 each
		assert.equal(new CheckoutSolution().checkout("AAAAA"), 200);

		// Mixed case: 5 A's + 2 B's + 1 C + 1 D
		assert.equal(new CheckoutSolution().checkout("AAAAABBCD"), 280);
	});
});
