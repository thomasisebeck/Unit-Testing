import {MongoClient, Document, WithId} from "mongodb";
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


export async function addToHistory(client: MongoClient, record: {equation: string}[]): Promise<boolean>;
export async function addToHistory(client: MongoClient, record: {equation: string}): Promise<boolean>;
export async function addToHistory(client: MongoClient, record: unknown): Promise<boolean> {
    try {
        if (Array.isArray(record)) {
            await client.db("history").collection(process.env.COLLECTION!).insertMany(record as { equation: string }[]);
        } else {
            await client.db("history").collection(process.env.COLLECTION!).insertOne(record as { equation: string });
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function getHistory(client: MongoClient): Promise<WithId<Document>[]> {
    const documents =  await client.db("history").collection(process.env.COLLECTION!).find({}).toArray();
    console.log(documents);
    return documents;
}

export async function clearHistory(client: MongoClient) {
    await client.db("history").collection(process.env.COLLECTION!).deleteMany({});
    return "success";
}