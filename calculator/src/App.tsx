import s from './App.module.scss'
import {useState} from "react";
import {ComputationStack, Operations} from "./logic/operations.ts";
import Calculator from "./logic/logic.ts";


function App() {

    const [stack, setStack] = useState<ComputationStack[]>([]);
    const [lastValue, setLastValue] = useState("");
    const [display, setDisplay] = useState("");
    const [lastComputationDisplay, setlastComputationDisplay] = useState("");
    const [mustClearOnNextClick, setMustClearOnNextClick] = useState(false);

    const setLastHexValue = (val: string) => {
        if (mustClearOnNextClick) {
            setMustClearOnNextClick(false);
            setDisplay(val)
            setLastValue(val)
            return ;
        }

        setDisplay(display + val);
        setLastValue(lastValue + val);
    }

    const computeStack = () => {

        const c = new Calculator();
        setlastComputationDisplay(display + " =");
        setMustClearOnNextClick(true);

        try {
            setDisplay(c.getResult([...stack, { value: lastValue, operation: null}]));
        } catch (e) {
            setlastComputationDisplay("")
            setDisplay("Invalid")
            setTimeout(() => {
                setDisplay("")
            }, 1000);
        }
    }

    const addToStack = (op: Operations) => {
        if (lastValue == "")
            return;

        switch (op) {
            case Operations.ADD:
                setDisplay(display + " + ")
                break;
            case Operations.SUBTRACT:
                setDisplay(display + " - ")
                break;
            case Operations.MULTIPLY:
                setDisplay(display + " * ")
                break;
            case Operations.DIVIDE:
                setDisplay(display + " / ")
                break;
            default:
                throw "error";

        }

        setStack([...stack, {
            value: lastValue,
            operation: op
        }])

        setLastValue("");
    }

    return (
        <div className={s.outer}>
            <div className={s.container}>
                <div className={s.screen}>
                    <div>{lastComputationDisplay}</div>
                    <div>{display}</div>
                </div>

                <div className={s.body}>
                    <div className={s.tools}>
                        <img src={'history.svg'}/>
                        <img src={'backspace.svg'}/>
                    </div>
                    <div className={s.buttons}>
                        <div>M+</div>
                        <div>M-</div>
                        <div>MC</div>
                        <div>MR</div>

                        <div onClick={() => setLastHexValue("A")}>A</div>
                        <div onClick={() => setLastHexValue("B")}>B</div>
                        <div onClick={() => setLastHexValue("C")}>C</div>

                        <div onClick={() => {
                            setLastValue("");
                            setDisplay("");
                            setStack([]);
                            setlastComputationDisplay("");
                        }}>clear
                        </div>

                        <div onClick={() => setLastHexValue("D")}>D</div>
                        <div onClick={() => setLastHexValue("E")}>E</div>
                        <div onClick={() => setLastHexValue("F")}>F</div>

                        <div onClick={() => addToStack(Operations.ADD)}>+</div>

                        <div onClick={() => setLastHexValue("7")}>7</div>
                        <div onClick={() => setLastHexValue("8")}>8</div>
                        <div onClick={() => setLastHexValue("9")}>9</div>
                        <div onClick={() => addToStack(Operations.MULTIPLY)}>x</div>

                        <div onClick={() => setLastHexValue("4")}>4</div>
                        <div onClick={() => setLastHexValue("5")}>5</div>
                        <div onClick={() => setLastHexValue("6")}>6</div>
                        <div onClick={() => addToStack(Operations.SUBTRACT)}>-</div>

                        <div onClick={() => setLastHexValue("1")}>1</div>
                        <div onClick={() => setLastHexValue("2")}>2</div>
                        <div onClick={() => setLastHexValue("3")}>3</div>
                        <div onClick={() => addToStack(Operations.DIVIDE)}>/</div>

                        <div></div>
                        <div onClick={() => setLastHexValue("0")}>0</div>
                        <div></div>
                        <div onClick={() => computeStack()}>=</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
