import {MongoClient, ServerApiVersion} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config();

const database = process.env.ENVIRONAMENT == "test" ? process.env.TEST_DB : process.env.DATABSE;

const uri = `mongodb+srv://myUser:${process.env.MONGO_PASSWORD}@calculatorcluster.lrorhbp.mongodb.net/?retryWrites=true&w=majority&appName=CalculatorCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client:MongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export async function connectClient(): Promise<MongoClient> {
    await client.connect();
    return client;
}
export async function closeClient(c: MongoClient){
    await c.close();
}