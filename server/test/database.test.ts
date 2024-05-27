import { pingDB, getHistory, clearHistory, addToHistory } from '../src/database'
import { connectClient, closeClient } from '../src/connection'
import {Document, MongoClient, WithId} from "mongodb";
import any = jasmine.any;
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

        if (result == false)
            fail("can't insert");

        expect(result.acknowledged).toBe(true);

        const records = [{
            'equation': '1 + 43 + 34433 = 3423'
        }, {
            'equation': '1 + 32 + 322 = 1232'
        }];
        const result2 = await addToHistory(client, records);
        if (result2 == false)
            fail("can't insert")

        expect(result2.acknowledged).toBe(true);
    })

    it('can retrieve history',  async () => {
        let result = await getHistory(client);
        if (result == null)
            return fail("result is null")

        //last inserted item
        expect(result.document['equation']).toBe('1 + 32 + 322 = 1232');

        expect(result.canRetrieveMore).toBe(true);

        result = await getHistory(client);
        if (result == null)
            return fail("result is null")

        //last inserted item
        expect(result.document['equation']).toBe(
           '1 + 43 + 34433 = 3423'
        )

        expect(result.canRetrieveMore).toBe(true);

         result = await getHistory(client);
        if (result == null)
            return fail("result is null")

        expect(result.document['equation']).toBe(
            '1 + 23 + 34433 = 3423'
        )

        expect(result.canRetrieveMore).toBe(false);

        const records = [{
            'equation': '1 + 43 + 34433 = 3423'
        }, {
            'equation': '1 + 32 + 322 = 1232'
        }];
        const result2 = await addToHistory(client, records);
        expect(result2).not.toBe(false);

    })

    it('can delete all',  async () => {
        await clearHistory(client);
        const result = await getHistory(client);
        expect(result).toBe(null);
    })
})