import { expect, test } from 'bun:test';
import mssql from 'mssql';
import dbConfig from '../constant';

async function establishConnection() {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);
    test("connection establishing", async () => {
        let isConnect = false;
        try { if (!dbClientPools.connected) await dbClientPools.connect(); isConnect = dbClientPools.connected }
        catch (exception) { console.log('exception', exception) }
        expect(isConnect).toBe(true);
        await dbClientPools.close()
    });
}

export default establishConnection;