var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const CheckoutSolution = require("../../../lib/solutions/CHK/checkout_solution");

describe("CHK challenge: supermarket checkout", function () {
	it("returns -1 for invalid input", function () {
		assert.equal(new CheckoutSolution().checkout("INVALID"), -1);
	});

	it("should return a standard greeting message if a name is not provided", function () {
		assert.equal(new HelloSolution().hello(), "Hello, World!");
	});
});
