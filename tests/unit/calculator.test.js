const { add, subtract, multiply, divide } = require("../../src/calculator");

describe("Calculator", () => {
  describe("add", () => {
    test("adds two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("adds negative numbers", () => {
      expect(add(-1, -2)).toBe(-3);
    });

    test("adds zero", () => {
      expect(add(5, 0)).toBe(5);
    });
  });

  describe("subtract", () => {
    test("subtracts two numbers", () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test("returns negative result", () => {
      expect(subtract(3, 7)).toBe(-4);
    });
  });

  describe("multiply", () => {
    test("multiplies two numbers", () => {
      expect(multiply(3, 5)).toBe(15);
    });

    test("multiplies by zero", () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });

  describe("divide", () => {
    test("divides two numbers", () => {
      expect(divide(15, 3)).toBe(5);
    });

    test("returns decimal result", () => {
      expect(divide(10, 3)).toBeCloseTo(3.333, 2);
    });

    test("throws on division by zero", () => {
      expect(() => divide(5, 0)).toThrow("Division by zero");
    });
  });
});
