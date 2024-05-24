import {MongoClient} from "mongodb";
import dotenv from 'dotenv'

dotenv.config();

export async function pingDB(client: MongoClient): Promise<boolean> {
    try {
        // Send a ping to confirm a successful connection
        await client.db("calculator").command({ping: 1});
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}


export function addToHistory(record: { equation: string }) {
    return false;
}

export function getHistory() {
    return [];
}

export function clearHistory() {
    return false;
}