import { expect, test } from 'bun:test';
import mssql from 'mssql';
import MSSQLAdapter from "../../dist";
import dbConfig from '../constant';

async function updateBinding() {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    test(`test update param binding`, async () => {

        try { if (!dbClientPools.connected) await dbClientPools.connect() }
        catch (exception) { console.log('exception', exception) }

        const bindingParams = new MSSQLAdapter(dbClientPools);

        const dataSets = {
            USER_MASTER_ID: '00001',
            STATUS: 'ACTIVE',
            REMARK: 'ແອັກທີບ'
        };

        const updateDataSets = {
            ...dataSets,
            STATUS: 'INACTIVE',
            REMARK: 'ອິນແອັກທີບ'
        };
        const { USER_MASTER_ID, ...updatingDatasets } = updateDataSets;

        const updateBinding = bindingParams.updateBinding(updatingDatasets);

        const queryScript = `
        BEGIN
            DECLARE @USER_MASTER AS TABLE (
            USER_MASTER_ID          VARCHAR(150)            DEFAULT NULL,
            STATUS                  VARCHAR(150)            DEFAULT NULL,
            REMARK                  NVARCHAR(150)           DEFAULT NULL);

            INSERT INTO @USER_MASTER (USER_MASTER_ID, STATUS, REMARK) VALUES 
            ('${dataSets.USER_MASTER_ID}', '${dataSets.STATUS}', N'${dataSets.REMARK}');

            UPDATE @USER_MASTER SET ${updateBinding.value}
            WHERE USER_MASTER_ID = ${USER_MASTER_ID}

            SELECT * FROM @USER_MASTER;

        END
        `;
        const recordsets = await bindingParams.getRequestStatement.query(queryScript);
        console.log('recordset:', recordsets?.recordset);
        expect(recordsets.recordset.length).toBeInteger();
    });

}

export default updateBinding;