import mssql from 'mssql';

declare class MSSQLAdapter {
    private mssqlRequestPrepareStatement;
    connectionPools: mssql.ConnectionPool;
    private multiple;
    constructor(connectionPools: mssql.ConnectionPool, multiple?: boolean);
    get getRequestStatement(): mssql.Request;
    deleteBinding(valueObject: {}): {
        value: string;
        valueInputStatement: mssql.Request;
    };
    updateBinding(valueObject: {}): {
        value: string;
        valueInputStatement: mssql.Request;
    };
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
