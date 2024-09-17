import type { Request, config, IResult } from 'mssql';
import { ConnectionPool } from 'mssql';

class MSSQLAdapter {
    connectionPool: ConnectionPool;
    requestStatement: Request;
    constructor(dbConfig: config) {
        this.connectionPool = new ConnectionPool(dbConfig);
        this.requestStatement = this.connectionPool.request();
    }

    private initRequestStatement(): Request {
        this.requestStatement = this.connectionPool.request();
        return this.requestStatement;
    }

    public async executeQuery<T = undefined>(queryString: string): Promise<[null | undefined | Error, IResult<T>]> {

        try {
            await this.connectionPool.connect();
            return [, await this.connectionPool.query<T>(queryString)];
        }

        catch (Exception) {
            return [new Error(String(Exception)), null!];
        }

        finally {
            await this.connectionPool.close();
        }
    };

    public async queryRequestStatement<T = undefined>(queryString: string): Promise<[null | undefined | Error, IResult<T>]> {

        const requestStatement = this.requestStatement as Request;
        try {
            await this.connectionPool.connect();
            return [, await requestStatement.query<T>(queryString)];
        }

        catch (Exception) {
            return [new Error(String(Exception)), null!];
        }

        finally {
            await this.connectionPool.close();
        }
    };

    public deleteBinding(valueObject: {}) {
        let values: any[] = [];

        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            this.requestStatement?.input(key, value);
            values.push(`${key} = @${key}`);
        }

        return {
            value: values.join(' AND '),
            inputStatement: this.requestStatement,
        }
    }

    public updateBinding(valueObject: {}) {
        let values: any[] = [];

        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            this.requestStatement?.input(key, value);
            values.push(`${key} = @${key}`);
        }

        return {
            value: values.join(', '),
            inputStatement: this.requestStatement,
        }
    }

    public insertBinding(valueObject: {}) {
        // this.requestStatement = this.connectionPool.request();
        let column: any[] = [];
        let values: any[] = [];
        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            if (value && value != '') {
                this.requestStatement.input(key, value);
                column.push(`${key}`);
                values.push(`@${key}`);
            }
        }
        return {
            column: '(' + column.join(', ') + ')',
            value: '(' + values.join(', ') + ')',
            inputStatement: this.requestStatement,
        }
    }

    public bulkInsertBinding(dataSet: {}[]) {
        // this.requestStatement = this.connectionPool.request();
        let column: any[] = [];
        let values: any[] = [];
        column = Object.entries(dataSet[0]).map(([key]) => key);
        let index = 0;
        for (const valueObject of dataSet) {
            let value: any[] = [];
            for (const key in valueObject) {
                const val = valueObject[key as keyof typeof valueObject];
                this.requestStatement?.input(`${key}_${index}`, val);
                value.push(`@${key}_${index}`);
            }
            index++;
            values.push('(' + value.join(', ') + ')');
        }

        return {
            column: '(' + column.join(', ') + ')',
            values: values.join(', '),
            inputStatement: this.requestStatement,
        }
    }

    public selectBinding(valueObject: {}) {
        // this.requestStatement = this.connectionPool.request();
        let values: any[] = [];
        for (const key in valueObject) {
            const value = valueObject[key as keyof typeof valueObject];
            if (value && value != '') {
                this.requestStatement?.input(key, value);
                values.push(`${key} = @${key}`);
            }
        }

        return {
            value: values.join(' AND '),
            inputStatement: this.requestStatement,
        }
    }

}; interface IMSSQLAdapter extends MSSQLAdapter { };

export default MSSQLAdapter;
export type { IMSSQLAdapter };