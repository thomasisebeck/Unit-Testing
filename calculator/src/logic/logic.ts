import './operations.ts'

class Calculator {
    constructor() {
    }

    public add(first: string, second: string): string {
        return this.toHex(this.toDec(first) + this.toDec(second));
    }

    // public subtract(first: string, second: string) : string {
    //     return "";
    // }
    //
    // public multiply(first: string, second: string) : string {
    //     return "";
    // }
    //
    // public divide(first: string, second: string) : string {
    //     return "";
    // }

    private toHex(dec: number): string {
        let result = "";

        const hexDigits = "0123456789ABCDEF";
        while (dec > 0) {
            const remainder = dec % 16;
            console.log(remainder);
            result = hexDigits[remainder] + result;
            dec = Math.floor(dec / 16);
        }
        return result;
    }

    private toDec(hex: string): number {
        if (hex === undefined || hex.length === 0)
            throw "invalid hex number"

        const hexDigits = "0123456789ABCDEF";

        let value = 0;

        for (let i = 0; i < hex.length; i++) {
            const currentCar = hex[i];
            const position = hexDigits.indexOf(currentCar);
            //goes up in multiples of 16 each time
            //it gets higher up
            value = 16 * value + position;
        }
        return value;
    }

}

export default Calculator;