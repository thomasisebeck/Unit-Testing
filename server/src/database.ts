import {MongoClient, Document, WithId, InsertOneResult, InsertManyResult} from "mongodb";
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

export async function addToHistory(client: MongoClient, record: unknown) {
    try {
        if (Array.isArray(record)) {
            return await client.db(process.env.DATABASE).collection(process.env.COLLECTION!).insertMany(record as {
                top: string,
                bottom: string
            }[])
        } else {
            return await client.db(process.env.DATABASE).collection(process.env.COLLECTION!).insertOne(record as {
                top: string,
                bottom: string
            })
        }
    } catch (e) {
        console.log(e);
        return false;
    }
}

interface HistoryDocument extends Document {
    equation?: string
}

interface HistoryResponse {
    canRetrieveMore: boolean,
    document: HistoryDocument
}

export async function getHistory(client: MongoClient): Promise<HistoryResponse | null> {
    const documents = await client.db(process.env.DATABASE).collection(process.env.COLLECTION!).find({}).toArray();
    if (documents.length == 0)
        return null;

    const lastHistoryItem = documents[documents.length - 1];
    await client.db(process.env.DATABASE).collection(process.env.COLLECTION!).deleteOne({_id: lastHistoryItem._id});
    return {
        canRetrieveMore: documents.length > 1,
        document: lastHistoryItem
    };
}

export async function clearHistory(client: MongoClient) {
    await client.db(process.env.DATABASE).collection(process.env.COLLECTION!).deleteMany({});
    return "success";
}