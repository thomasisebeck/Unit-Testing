import { pingDB, getHistory, clearHistory, addToHistory } from '../database'
import { connectClient, closeClient } from '../connection'
import {MongoClient} from "mongodb";
describe('test database', () => {
    let client: MongoClient;

    beforeAll( async () => {
        client = await connectClient();
    })

    afterAll( async () => {
        if (client)
            await closeClient(client);
    })

    it('can ping the database',  async () => {
        const canPing = await pingDB(client);
        expect(canPing).toBe(true);
    })
    it('can insert into database',  async () => {
        const record = {
            'equation': '1 + 23 + 34433 = 3423'
        }
        const result = await addToHistory(client, record);
        expect(result).toBe(true);

        const records = [{
            'equation': '1 + 43 + 34433 = 3423'
        }, {
            'equation': '1 + 32 + 322 = 1232'
        }];
        const result2 = await addToHistory(client, records);
        expect(result2).toBe(true);
    })

    it('can retrieve history',  async () => {
        const result = await getHistory(client);
        if (result == null)
            return fail("result is null")

        expect(result.length).toEqual(3);
        expect(result[0].equation).toBe("1 + 23 + 34433 = 3423")
    })

    it('can delete all',  async () => {
        await clearHistory(client);
        const result = await getHistory(client);
        expect(result.length).toEqual(0);
    })
})