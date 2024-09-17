import { ConnectionPool, Request, config, IResult } from 'mssql';

declare class MSSQLAdapter {
    connectionPool: ConnectionPool;
    requestStatement: Request;
    constructor(dbConfig: config);
    private initRequestStatement;
    executeQuery<T = undefined>(queryString: string): Promise<[null | undefined | Error, IResult<T>]>;
    queryRequestStatement<T = undefined>(queryString: string): Promise<[null | undefined | Error, IResult<T>]>;
    deleteBinding(valueObject: {}): {
        value: string;
        inputStatement: Request;
    };
    updateBinding(valueObject: {}): {
        value: string;
        inputStatement: Request;
    };
    insertBinding(valueObject: {}): {
        column: string;
        value: string;
        inputStatement: Request;
    };
    bulkInsertBinding(dataSet: {}[]): {
        column: string;
        values: string;
        inputStatement: Request;
    };
    selectBinding(valueObject: {}): {
        value: string;
        inputStatement: Request;
    };
}
interface IMSSQLAdapter extends MSSQLAdapter {
}

export { type IMSSQLAdapter, MSSQLAdapter, MSSQLAdapter as default };
