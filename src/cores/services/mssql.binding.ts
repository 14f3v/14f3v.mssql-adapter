import mssql from 'mssql';

class MSSQLAdapter {
    private mssqlRequestPrepareStatement: mssql.Request;
    public connectionPools: mssql.ConnectionPool;
    constructor(connectionPools: mssql.ConnectionPool/* mssqlRequestPrepareStatement: mssql.Request, */) {
        this.connectionPools = connectionPools;
        this.mssqlRequestPrepareStatement = connectionPools.request();
    }

    public get getRequestStatement() {
        return this.mssqlRequestPrepareStatement;
    }

    public insertBinding(valueObject: {}) {
        let column: any[] = [];
        let values: any[] = [];

        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            this.mssqlRequestPrepareStatement.input(key, value);
            column.push(`${key}`);
            values.push(`@${key}`);
        }

        return {
            column: '(' + column.join(', ') + ')',
            value: '(' + values.join(', ') + ')',
            valueInputStatement: this.mssqlRequestPrepareStatement,
        }
    }

    public selectBinding(valueObject: {}) {
        let values: any[] = [];

        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            this.mssqlRequestPrepareStatement.input(key, value);
            values.push(`${key} = @${key}`);
        }

        return {
            value: values.join(' AND '),
            valueInputStatement: this.mssqlRequestPrepareStatement,
        }
    }

}; interface IMSSQLAdapter extends MSSQLAdapter { };

export default MSSQLAdapter;
export type { IMSSQLAdapter };