import express, {raw} from 'express'
import {getHistory, addToHistory, clearHistory} from "./database"
import {connectClient} from "./connection";
import {MongoClient} from "mongodb";
import 'dotenv';
import dotenv from "dotenv";
import cors from "cors"
import Calculator from "./logic/logic";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
let client: MongoClient;

(async () => {
    try {
        client = await connectClient();
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})();

app.post("/calculate", async (req, res) => {
    try {
        const c = new Calculator();
        console.log(req.body);
        const result = c.getResult(req.body);
        res.status(200).send(result);
    } catch (e) {
        console.error(e);
        res.status(204).send();
    }
})

app.get("/history", async (req, res) => {
    if (!client)
        return res.status(500).send("Client can't connect");

    const history = await getHistory(client);
    if(history != null)
        res.send({
            hasHistory: true,
            history: history
        })
    else {
        res.send({
            hasHistory: false
        })
    }

})

app.post("/history", async (req, res) => {
    if (!client)
        return res.status(500).send("Client can't connect");

    try {
        res.status(200).send(await addToHistory(client, req.body));
    } catch (e) {
        res.status(500).send(e)
    }
})

app.delete("/history", async (req, res) => { if (!client)
        return res.status(500).send("Client can't connect");

    res.send(await clearHistory(client));
})

app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING ON ${process.env.PORT}`)
})