import Calculator from "../../calculator/src/logic/logic";
import {describe, expect, it} from "@jest/globals";
import {ComputationStack, Operations} from "../../calculator/src/logic/operations.ts";

describe("test logic class", () => {
    it("add", () => {
        const c = new Calculator();

        //30 + 45 = 75
        expect(c.add("1E", "2D")).toBe("4B");

        //1244 + 2074 = 3318
        expect(c.add("4DC", "81A")).toBe("CF6")
    })

    it("subtract", () => {
        const c = new Calculator();

        //20 - 15 = 5
        expect(c.subtract("14", "F")).toBe("5");

        //233 - 70 = 163
        expect(c.subtract("E9", "46")).toBe("A3")
    });

    it("multiply", () => {
        const c = new Calculator();

        //30 * 45 = 546
        expect(c.multiply("1E", "2D")).toBe("546");

        //20 * 74 = 1480
        expect(c.multiply("14", "4A")).toBe("5C8")
    })

    it("divide", () => {
        const c = new Calculator();

        //10 / 2 = 5
        expect(c.divide("A", "2")).toBe("5");

        //240 / 20 = 12
        expect(c.divide("F0", "14")).toBe("C");

        expect(() => {
            c.divide("A", "0")
        })
            .toThrow("undefined")
    });

    it("get result", () => {

        const stack: ComputationStack[] = [
            {
                operation: Operations.ADD,
                value: "AB" //171
            },
            {
                operation: Operations.ADD,
                value: "CD" //205
            },
            {
                operation: Operations.SUBTRACT,
                value: "CD" //205
            },
            {
                operation: Operations.DIVIDE,
                value: "BE" //190
            },
            {
                operation: Operations.MULTIPLY,
                value: "4" //4
            },
            {
                operation: null,
                value: "7E" //126
            },
        ];

        //result = 12 222
        const c = new Calculator();

        expect(c.getResult(stack)).toBe("2FBE");
        try {
            expect(c.getResult([])).toThrow("Cannot calculate with len 0");
        } catch (e) {
            console.log(e);
        }

        try {
            expect(c.getResult([{
                operation: Operations.MULTIPLY,
                value: "4"
            }])).toThrow("Calculation must end with an empty operation")
        } catch (e) {
            console.log(e);
        }
    })

    it("toDec", () => {
        const c = new Calculator();
        expect(c.toDec("FF5")).toBe(4085);
        expect(c.toDec("ABC")).toBe(2748);

        try {
            expect(c.toDec("G")).toThrow("invalid hex digit found")
        } catch (e) {
           console.log(e)
        }

        try {
            expect(c.toDec("")).toThrow("invalid hex number")
        } catch (e) {
            console.log(e)
        }
    })

    it("toHex", () => {
        const c = new Calculator();
        expect(c.toHex(456)).toBe("1C8");
        expect(c.toHex(2045)).toBe("7FD");
        try {
            expect(c.toHex(-9)).toThrow("Cannot convert negatives")
        } catch (e) {
            console.log(e)
        }
    })
})


