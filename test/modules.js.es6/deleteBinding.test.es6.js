import { expect, test } from 'bun:test';
import mssql from 'mssql';
import MSSQLAdapter from "../../dist";
import dbConfig from '../constant';

async function deleteBinding() {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    test(`test deletion param binding`, async () => {

        try { if (!dbClientPools.connected) await dbClientPools.connect() }
        catch (exception) { console.log('exception', exception) }

        const bindingParams = new MSSQLAdapter(dbClientPools);

        const dataSets = {
            USER_MASTER_ID: '00001',
            STATUS: 'ACTIVE',
            REMARK: 'ແອັກທີບ'
        };
        const { REMARK, ...deletingDatasets } = dataSets;

        const updateBinding = bindingParams.deleteBinding(deletingDatasets);

        const queryScript = `
        BEGIN
            DECLARE @USER_MASTER AS TABLE (
            USER_MASTER_ID          VARCHAR(150)            DEFAULT NULL,
            STATUS                  VARCHAR(150)            DEFAULT NULL,
            REMARK                  NVARCHAR(150)           DEFAULT NULL);

            INSERT INTO @USER_MASTER (USER_MASTER_ID, STATUS, REMARK) VALUES 
            ('${dataSets.USER_MASTER_ID}', '${dataSets.STATUS}', N'${dataSets.REMARK}');

            DELETE @USER_MASTER 
            WHERE ${updateBinding.value};
            SELECT * FROM @USER_MASTER;

        END
        `;
        const recordsets = await bindingParams.getRequestStatement.query(queryScript);
        console.log('recordset:', recordsets?.recordset);
        expect(recordsets.recordset.length).toBeInteger();
        expect(recordsets.recordset.length).toBe(0);
    });

}

export default deleteBinding;