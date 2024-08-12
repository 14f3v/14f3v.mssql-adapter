import mssql from 'mssql';

class MSSQLDatabaseParamBinder {
    private mssqlRequestPrepareStatement: mssql.Request;
    constructor(
        mssqlRequestPrepareStatement: mssql.Request,
    ) {
        this.mssqlRequestPrepareStatement = mssqlRequestPrepareStatement;
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

}; interface IMSSQLDatabaseParamBinder extends MSSQLDatabaseParamBinder { };

export default MSSQLDatabaseParamBinder;
export type { IMSSQLDatabaseParamBinder };