import mssql from 'mssql';

class MSSQLAdapter {
    private mssqlRequestPrepareStatement: mssql.Request;
    public connectionPools: mssql.ConnectionPool;
    private multiple: boolean = false;
    constructor(connectionPools: mssql.ConnectionPool/* mssqlRequestPrepareStatement: mssql.Request, */, multiple?: boolean) {
        this.connectionPools = connectionPools;
        this.mssqlRequestPrepareStatement = connectionPools.request();
        this.multiple = multiple || false;
        this.mssqlRequestPrepareStatement.multiple = this.multiple;
    }

    public get getRequestStatement() {
        return this.mssqlRequestPrepareStatement;
    }

    public deleteBinding(valueObject: {}) {
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

    public updateBinding(valueObject: {}) {
        let values: any[] = [];

        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            this.mssqlRequestPrepareStatement.input(key, value);
            values.push(`${key} = @${key}`);
        }

        return {
            value: values.join(', '),
            valueInputStatement: this.mssqlRequestPrepareStatement,
        }
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

    public bulkInsertBinding(dataSet: {}[]) {
        let column: any[] = [];
        let values: any[] = [];
        column = Object.entries(dataSet[0]).map(([key]) => key);
        for (const valueObject of dataSet) {
            let value: any[] = [];
            for (const key in valueObject) {
                const val = valueObject[key as keyof typeof valueObject];
                this.mssqlRequestPrepareStatement.input(key, val);
                value.push(`@${key}`);
            }
            values.push(value);
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