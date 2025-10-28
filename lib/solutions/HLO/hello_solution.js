"use strict";

class HelloSolution {
	hello(friendName) {
		if (!friendName || typeof friendName !== "string") {
			friendName = "friend";
		}

		return "Hello, " + friendName + ", and hello world!";
	}
}

module.exports = HelloSolution;


