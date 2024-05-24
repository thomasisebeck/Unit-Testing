import { pingDB, getHistory, clearHistory, addToHistory } from '../database'

describe('test database', () => {
    beforeEach( () => {
    })

    afterEach( () => {
    })

    it('can ping the database',  () => {
        const canPing =   pingDB();
        expect(canPing).toBe(true);
    })
    it('can insert into database',  () => {
        const record = {
            'equation': '1 + 23 + 34433 = 3423'
        }
        const result =  addToHistory(record);
        expect(result).toBe(true);

        const records = [{
            'equation': '1 + 43 + 34433 = 3423'
        }, {
            'equation': '1 + 32 + 322 = 1232'
        }];
        const result2 =  addToHistory(record);
        expect(result).toBe(true);
    })

    it('can retrieve history',  () => {
        const result =  getHistory();
        if (result == null)
            return fail("result is null")

        expect(result.length).toEqual(3);

        // @ts-ignore
        expect(result[0].equation).to.eq("1 + 23 + 34433 = 3423")
    })

    it('can delete all',  () => {
        clearHistory();
        const result = getHistory();
        expect(result.length).toEqual(0);
    })
})