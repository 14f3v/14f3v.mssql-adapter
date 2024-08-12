import { expect, test } from 'bun:test';
import mssql from 'mssql';
import MSSQLAdapter from "../../dist";
import dbConfig from '../constant';

async function selectionBinding() {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    test(`test select param binding`, async () => {
        try { if (!dbClientPools.connected) await dbClientPools.connect() }
        catch (exception) { console.log('exception', exception) }
        const bindingParams = new MSSQLAdapter(dbClientPools);
        const selectBinder = bindingParams.selectBinding({
            USER_MASTER_ID: '00001',
            STATUS: 'ACTIVE'
        });
        const queryScript = `SELECT * FROM USER_MASTER WHERE ${selectBinder.value}`;
        const recordsets = await bindingParams.getRequestStatement.query(queryScript);
        expect(recordsets.recordset.length).toBeInteger();
    });

}

export default selectionBinding;