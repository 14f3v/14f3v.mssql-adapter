import { expect, test } from 'bun:test';
import mssql from 'mssql';
import MSSQLAdapter from "../../dist";
import dbConfig from '../constant';

async function insertionBinding() {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    test(`test select param binding`, async () => {
        const bindingParams = new MSSQLAdapter(dbClientPools);

        try { if (!bindingParams.connectionPools.connected) await bindingParams.connectionPools.connect() }
        catch (exception) { console.log('exception', exception) }

        const selectBinder = bindingParams.insertBinding({
            USER_MASTER_ID: '00001',
            STATUS: 'ACTIVE',
            REMARK: 'ແອັກທີບ'
        });

        const queryScript = `
        BEGIN
            DECLARE @USER_MASTER AS TABLE (
            USER_MASTER_ID          VARCHAR(150)            DEFAULT NULL,
            STATUS                  VARCHAR(150)            DEFAULT NULL,
            REMARK                  NVARCHAR(150)           DEFAULT NULL);

            INSERT INTO @USER_MASTER ${selectBinder.column} VALUES ${selectBinder.value}
            SELECT * FROM @USER_MASTER;

        END
        `;

        const recordsets = await bindingParams.getRequestStatement.query(queryScript);
        console.log('insertion recordsets', recordsets?.recordset);
        expect(recordsets.recordset.length).toBeInteger();
    });

}

export default insertionBinding;