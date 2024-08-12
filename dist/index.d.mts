import mssql from 'mssql';

declare class MSSQLDatabaseParamBinder {
    private mssqlRequestPrepareStatement;
    constructor(mssqlRequestPrepareStatement: mssql.Request);
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
interface IMSSQLDatabaseParamBinder extends MSSQLDatabaseParamBinder {
}

export { type IMSSQLDatabaseParamBinder, MSSQLDatabaseParamBinder, MSSQLDatabaseParamBinder as default };
