var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const SumSolution = require("../../../lib/solutions/SUM/sum_solution");

describe("HLO challenge: greeting the world", function () {
	it("should return a greeting message with the friend's name", function () {
		assert.equal(
			new HelloSolution().hello("Alice"),
			"Hello, Alice, and hello world!",
		);
	});

	it("should return a greeting message with 'friend' when no name is provided", function () {
		assert.equal(
			new HelloSolution().hello(),
			"Hello, friend, and hello world!",
		);
	});

	it("should return a greeting message with 'friend' when name is not a string", function () {
		assert.equal(
			new HelloSolution().hello(123),
			"Hello, friend, and hello world!",
		);
	});
});

