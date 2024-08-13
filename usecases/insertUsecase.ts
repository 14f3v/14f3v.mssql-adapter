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

async function insertionUsecase() {

    const dbClientPools = new mssql.ConnectionPool(dbConfig);
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

}

export default insertionUsecase;