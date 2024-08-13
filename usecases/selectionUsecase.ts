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

async function selectionUsecase() {

    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    try { if (!dbClientPools.connected) await dbClientPools.connect() }
    catch (exception) { console.log('exception', exception) }

    const bindingParams = new MSSQLAdapter(dbClientPools);
    const selectBinder = bindingParams.selectBinding({
        USER_MASTER_ID: '00001',
        STATUS: 'ACTIVE'
    });

    const queryScript = `SELECT * FROM USER_MASTER WHERE ${selectBinder.value}`;
    const recordsets = await bindingParams.getRequestStatement.query(queryScript);
    console.log('recordsets:', recordsets?.recordset);

}

export default selectionUsecase;