import './operations.ts'

class Calculator {
    constructor() {
    }

    public add(first: string, second: string): string {
        return this.toHex(this.toDec(first) + this.toDec(second));
    }

    public subtract(first: string, second: string) : string {
        return this.toHex(this.toDec(first) - this.toDec(second));
    }

    public multiply(first: string, second: string) : string {
        return this.toHex(this.toDec(first) * this.toDec(second));
    }

    public divide(first: string, second: string) : string {
        if (second == "0")
            throw "undefined";
        return this.toHex(this.toDec(first) / this.toDec(second));
    }

    private toHex(dec: number)  : string {
        if (isNaN(dec))
            throw new Error("Not a number");
        if (dec < 0)
            throw new Error("Cannot convert negatives");

        let result = "";

        const hexDigits = "0123456789ABCDEF";
        while (dec > 0) {
            const remainder = dec % 16;
            console.log(remainder);
            result = hexDigits[remainder] + result;
            dec = Math.floor(dec / 16);
            console.log("Iterating...");
        }
        return result;
    }

    private toDec(hex: string)  : number {
        if (hex === undefined || hex.length === 0)
            throw "invalid hex number"

        const hexDigits = "0123456789ABCDEF";

        let value = 0;

        for (let i = 0; i < hex.length; i++) {
            const currentCar = hex[i];
            const position = hexDigits.indexOf(currentCar);
            //goes up in multiples of 16 each time
            //it gets higher up
            value = 16*value + position;
        }
        return value;
    }

}

export default Calculator;