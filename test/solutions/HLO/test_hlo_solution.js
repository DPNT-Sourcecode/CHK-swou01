var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const SumSolution = require("../../../lib/solutions/SUM/sum_solution");

describe("HLO challenge: greeting the world", function () {
	it("should return a standard greeting message if a name is provided", function () {
		assert.equal(new HelloSolution().hello("Alice"), "Hello, World!");
	});

	it("should return a standard greeting message if a name is not provided", function () {
		assert.equal(new HelloSolution().hello(), "Hello, World!");
	});
});


