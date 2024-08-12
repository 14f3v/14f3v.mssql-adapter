import mssql from 'mssql';

declare class MSSQLAdapter {
    private mssqlRequestPrepareStatement;
    connectionPools: mssql.ConnectionPool;
    constructor(connectionPools: mssql.ConnectionPool);
    get getRequestStatement(): mssql.Request;
    insertBinding(valueObject: {}): {
        column: string;
        value: string;
        valueInputStatement: mssql.Request;
    };
    selectBinding(valueObject: {}): {
        value: string;
        valueInputStatement: mssql.Request;
    };
}
interface IMSSQLAdapter extends MSSQLAdapter {
}

export { type IMSSQLAdapter, MSSQLAdapter, MSSQLAdapter as default };
