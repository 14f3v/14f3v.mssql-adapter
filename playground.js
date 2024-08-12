const mssql = require('mssql');
const { MSSQLDatabaseParamBinder } = require("./dist/index");
// import MSSQLDatabaseParamBinder from './dist/index'

const dbConfig = {
    user: "SA",
    password: "Admin@123",
    server: "10.88.1.10",
    database: "HRMS_MBAPP",
    options: {
        encrypt: false,
        enableArithAbort: true
    }
};

(async function () {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    try { if (!dbClientPools.connected) await dbClientPools.connect() }
    catch (exception) { console.log('exception', exception) }
    const bindingParams = new MSSQLDatabaseParamBinder(dbClientPools.request());
    const selectBinder = bindingParams.selectBinding({
        USER_MASTER_ID: '00001',
        STATUS: 'ACTIVE'
    });
    const queryScript = `SELECT * FROM USER_MASTER WHERE ${selectBinder.value}`;
    const recordsets = await bindingParams.getRequestStatement.query(queryScript);
    console.log('count', recordsets?.recordset?.length)
})();