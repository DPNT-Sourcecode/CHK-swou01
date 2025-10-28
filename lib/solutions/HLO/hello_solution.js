"use strict";

class HelloSolution {
	hello(friendName) {
		return `Hello, ${friendName || "World"}!`;
	}
}

module.exports = HelloSolution;
