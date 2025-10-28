var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");

describe("HLO challenge: greeting the world", function () {
	it("should return a custom greeting message if a name is provided", function () {
		assert.equal(new HelloSolution().hello("Alice"), "Hello, Alice!");
	});

	it("should return a standard greeting message if a name is not provided", function () {
		assert.equal(new HelloSolution().hello(), "Hello, World!");
	});
});
