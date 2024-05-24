import Calculator from "../logic/logic";
import {describe, it, expect} from "@jest/globals";

describe("test logic class", () => {
    it("add", () => {
        const c = new Calculator();

        //30 + 45 = 75
        expect(c.add("1E", "2D")).toBe("4B");

        //1244 + 2074 = 3318
        expect(c.add("4DC","81A")).toBe("CF6")
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

})


