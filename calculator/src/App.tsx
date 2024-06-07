import s from './App.module.scss'
import {useState} from "react";
import {ComputationStack, Operations} from "./logic/operations.ts";

function App() {

    const [stack, setStack] = useState<ComputationStack[]>([]);
    const [lastValue, setLastValue] = useState("");
    const [display, setDisplay] = useState("");
    const [lastComputationDisplay, setlastComputationDisplay] = useState("");
    const [mustClearOnNextClick, setMustClearOnNextClick] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [retrieveEnabled, setRetrieveEnabled] = useState(false);
    const [isAngry, setIsAngry] = useState(false);
    const [strokeCount, setStrokeCount] = useState(0);
    const [buttonsEnabled, setButtonsEnabled] = useState<boolean>(true);

    const usedOperator = (): boolean => display.includes("+") || display.includes("-") || display.includes("*") || display.includes("/");

    const setLastHexValue = (val: string) => {

        if (!buttonsEnabled)
            return;

        setCanSave(false);

        if (mustClearOnNextClick) {
            setMustClearOnNextClick(false);
            setDisplay(val)
            setLastValue(val)
            return;
        }

        const newVal = display + val;

        setDisplay(newVal);
        setLastValue(lastValue + val);

        if (newVal.length == 3) {//first 3 digits entered
            console.log("disabling")
            setButtonsEnabled(false);
            console.log(buttonsEnabled);
        }

        if (display.includes(" ") && display.substring(display.indexOf(" "), display.length).length == 5) //last 3 digits entered
            setButtonsEnabled(false);

    }

    const computeStack = () => {

        resetToDefaults();
        setMustClearOnNextClick(true);

        fetch(`http://localhost:3000/calculate`, {
            method: 'POST',
            body: JSON.stringify([...stack, {value: lastValue, operation: null}]),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(async response => {
            if (response.status == 200) {
                setlastComputationDisplay(display + "=")
                setDisplay(await response.text());
                setCanSave(true);
            }
            else if (response.status == 204) {
                setDisplay("ERROR!")

                setlastComputationDisplay("")
                setIsAngry(true);
                setDisplay("NO!");
                setStack([]);

                setStrokeCount(0);
                const aud = new Audio('/meow.mp3');
                aud.play();

                setTimeout(() => {
                    setDisplay("")
                }, 1000);

                setTimeout(() => {
                    setIsAngry(false);
                }, 2000);

            }
            else {
                console.log('SERVER ERROR');
                console.log(response);
            }
        })

        // const c = new Calculator();
        // setlastComputationDisplay(display + " =");
        // setMustClearOnNextClick(true);
        //
        // try {
        //     setDisplay(c.getResult([...stack, {value: lastValue, operation: null}]));
        //     setCanSave(true);
        // } catch (e) {
        //
        //     console.log(e);
        //     setlastComputationDisplay("")
        //     setIsAngry(true);
        //     setDisplay("NO!");
        //     setStack([]);
        //
        //     setStrokeCount(0);
        //     const aud = new Audio('/meow.mp3');
        //     aud.play();
        //
        //     setTimeout(() => {
        //         setDisplay("")
        //     }, 1000);
        //
        //     setTimeout(() => {
        //         setIsAngry(false);
        //     }, 2000);
        // }
    }

    const addToStack = (op: Operations) => {
        if (lastValue == "")
            return;

        setButtonsEnabled(true);

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

    function clearDisplayDelayed() {
        setTimeout(() => {
            setDisplay("")
            setlastComputationDisplay("")
            setCanSave(false);
        }, 1000);
    }

    const saveToMemory = async () => {

        setStack([]);

        fetch(`http://localhost:3000/history`, {
            method: 'POST',
            body: JSON.stringify({
                top: lastComputationDisplay,
                bottom: display
            }),
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                setDisplay("SUCCESS!")
                setMustClearOnNextClick(false);
                clearDisplayDelayed();
                setRetrieveEnabled(true);
            } else {
                setDisplay("ERROR!")
            }
        })
    }

    const getLastHistory = async () => {
        fetch('http://localhost:3000/history', {
            method: 'GET'
        }).then(async response => {
            if (response.ok) {
                const toSet = await response.json();
                console.log(toSet);

                if (toSet.hasHistory == true) {
                    setlastComputationDisplay(toSet.history.document.top)
                    setDisplay(toSet.history.document.bottom)
                    setMustClearOnNextClick(false);
                    console.log("TOSET")
                    console.log(toSet);
                    setRetrieveEnabled(toSet.history.canRetrieveMore);
                } else {
                    setlastComputationDisplay("")
                    setDisplay("NO HISTORY")
                    clearDisplayDelayed();
                }
            } else {
                setlastComputationDisplay("")
                setDisplay("ERROR!")
                clearDisplayDelayed();
            }
        })
    }

    const handleStroke = () => {
        setStrokeCount(strokeCount + 1);
        if (strokeCount > 15) {
            setStrokeCount(0);
            const aud = new Audio('purr.mp3');
            aud.play();
        }
    }

    function operatorButton(op: Operations) {
        let symbol = '';
        switch (op) {
            case Operations.ADD:
                symbol = '+';
                break;
            case Operations.SUBTRACT:
                symbol = '-';
                break;
            case Operations.MULTIPLY:
                symbol = '*';
                break;
            case Operations.DIVIDE:
                symbol = '/';
                break;
        }
        return <div className={`${usedOperator() ? s.disabled : ""} ${s.operationButton}`}
                    onClick={() => !usedOperator() && addToStack(op)}>{symbol}
        </div>;
    }

    function resetToDefaults() {
        setLastValue("");
        setDisplay("");
        setStack([]);
        setlastComputationDisplay("");
        setCanSave(false);
        setButtonsEnabled(true);
    }

    return (
        <div className={s.outer}>
            <div className={[s.container, isAngry ? s.angry : ''].join(' ')}>
                <div className={s.ears}>
                    <div className={s.earsPink}></div>
                    <div className={s.earsInner}></div>
                </div>
                <div className={s.screen}
                     onMouseOut={() => handleStroke()}>

                    <div id={"lastComputationDisplay"}>{lastComputationDisplay}</div>
                    <div id={"display"}>{display}</div>
                </div>

                <div className={s.body}>
                    <div className={s.tools}>
                        <img src={'backspace.svg'}
                             onClick={() => {
                                 setDisplay(display.substring(0, display.length - 1));
                                 setButtonsEnabled(true);
                             }}/>
                    </div>
                    <div className={`${s.buttons} ${!buttonsEnabled ? s.disabledButtons : ''}`}>
                        <div className={[s.large, !canSave ? s.disabled : ''].join(' ')}
                             onClick={() => canSave && saveToMemory()}>remember
                        </div>
                        <div className={[s.large, !retrieveEnabled ? s.disabled : ''].join(' ')}
                             onClick={() => buttonsEnabled && getLastHistory()}>recall
                        </div>

                        <div onClick={() => setLastHexValue("A")}>A</div>
                        <div onClick={() => setLastHexValue("B")}>B</div>
                        <div onClick={() => setLastHexValue("C")}>C</div>

                        <div className={s.operationButton} onClick={() => resetToDefaults()}>clear
                        </div>

                        <div onClick={() => setLastHexValue("D")}>D</div>
                        <div onClick={() => setLastHexValue("E")}>E</div>
                        <div onClick={() => setLastHexValue("F")}>F</div>
                        {operatorButton(Operations.ADD)}

                        <div onClick={() => setLastHexValue("7")}>7</div>
                        <div onClick={() => setLastHexValue("8")}>8</div>
                        <div onClick={() => setLastHexValue("9")}>9</div>
                        {operatorButton(Operations.MULTIPLY)}

                        <div onClick={() => setLastHexValue("4")}>4</div>
                        <div onClick={() => setLastHexValue("5")}>5</div>
                        <div onClick={() => setLastHexValue("6")}>6</div>
                        {operatorButton(Operations.SUBTRACT)}

                        <div onClick={() => setLastHexValue("1")}>1</div>
                        <div onClick={() => setLastHexValue("2")}>2</div>
                        <div onClick={() => setLastHexValue("3")}>3</div>
                        {operatorButton(Operations.DIVIDE)}

                        <div className={s.disabled}></div>
                        <div onClick={() => setLastHexValue("0")}>0</div>
                        <div className={s.disabled}></div>
                        <div className={s.equals} onClick={() => computeStack()}>=</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
