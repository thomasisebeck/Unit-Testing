import s from './App.module.scss'
import {useState} from "react";

function App() {

    [stack, setStack] = useState<ComputationStack>([]);

    return (
        <div className={s.outer}>
        <div className={s.container}>
            <div className={s.screen}>
                <div>45 X 24</div>
                <div>1080</div>
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

                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
                    <div>clear</div>

                    <div>D</div>
                    <div>E</div>
                    <div>F</div>
                    <div>+</div>

                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>x</div>

                    <div>4</div>
                    <div>5</div>
                    <div>6</div>
                    <div>-</div>

                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>/</div>

                    <div></div>
                    <div>0</div>
                    <div></div>
                    <div>=</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default App
