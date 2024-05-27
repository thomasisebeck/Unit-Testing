import express, {raw} from 'express'
import {getHistory, addToHistory, clearHistory} from "./database"
import {connectClient} from "./connection";
import {MongoClient} from "mongodb";
import 'dotenv';
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(express.json());
let client: MongoClient;

(async () => {
    try {
        client = await connectClient();
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})();

app.get("/history", async (req, res) => {
    if (!client)
        return res.status(500).send("Client can't connect");
    res.send(await getHistory(client));
})

app.post("/history", async (req, res) => {
    if (!client)
        return res.status(500).send("Client can't connect");

    res.send(await addToHistory(client, req.body));
})

app.delete("/history", async (req, res) => { if (!client)
        return res.status(500).send("Client can't connect");

    res.send(await clearHistory(client));
})

app.listen(process.env.PORT, () => {
    console.log(`SERVER LISTENING ON ${process.env.PORT}`)
})