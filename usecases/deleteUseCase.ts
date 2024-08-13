import mssql, { type config } from 'mssql';
import MSSQLAdapter from 'mssql-libs';

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        enableArithAbort: true
    }
} as config;

async function deleteBinding() {

    const dbClientPools = new mssql.ConnectionPool(dbConfig);

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

}

export default deleteBinding;