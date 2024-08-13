# 14f3v.bun-library

The primary purpose of this package is to allow developers to handle MSSQL parameter binding effortlessly. By using mssql-param-binding-adapter, developers can ensure that their SQL queries are protected against injection attacks and are easier to manage, leading to more secure and reliable database interactions.


## Installation
Package not available on npm package manager platform. So, in-case of install package via git, follow an instruction below.

- Using bun package manager.
  
```bash
bun add --dev git+https://github.com/14f3v/14f3v.mssql-adapter.git
```

- Using npm package manager.
  
```bash
npm install git+https://github.com/14f3v/14f3v.mssql-adapter.git
```

- Using yarn package manager.

```bash
yarn add git+https://github.com/14f3v/14f3v.mssql-adapter.git
```


## Usage

### Selection params binding usecase.

a usecase of using mssql adaptor selection params binding.

![Image](https://pub-5aaeaed86d84443285bf87b879339bad.r2.dev/images/image.selection.png)

- code example to use mssql adaptor selection param binding.

```typescript
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
```

### Insertion params binding usecase.

a usecase of using mssql adaptor insertion params binding.

![Image](https://pub-5aaeaed86d84443285bf87b879339bad.r2.dev/images/image.insertion.png)

- code example to use mssql adaptor insertion param binding.

```typescript
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

async function insertionUsecase() {

    const dbClientPools = new mssql.ConnectionPool(dbConfig);
    const bindingParams = new MSSQLAdapter(dbClientPools);

    try { if (!bindingParams.connectionPools.connected) await bindingParams.connectionPools.connect() }
    catch (exception) { console.log('exception', exception) }

    const selectBinder = bindingParams.insertBinding({
        USER_MASTER_ID: '00001',
        STATUS: 'ACTIVE',
        REMARK: 'ແອັກທີບ'
    });

    const queryScript = `
        BEGIN
            DECLARE @USER_MASTER AS TABLE (
            USER_MASTER_ID          VARCHAR(150)            DEFAULT NULL,
            STATUS                  VARCHAR(150)            DEFAULT NULL,
            REMARK                  NVARCHAR(150)           DEFAULT NULL);

            INSERT INTO @USER_MASTER ${selectBinder.column} VALUES ${selectBinder.value}
            SELECT * FROM @USER_MASTER;

        END
        `;

    const recordsets = await bindingParams.getRequestStatement.query(queryScript);
    console.log('insertion recordsets', recordsets?.recordset);

}

export default insertionUsecase;
```

### Update params binding usecase.

a usecase of using mssql adaptor update params binding.

![Image](https://pub-5aaeaed86d84443285bf87b879339bad.r2.dev/images/image.update.png)

- code example to use mssql adaptor update param binding.

```typescript
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

async function updateUsecase() {
    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    try { if (!dbClientPools.connected) await dbClientPools.connect() }
    catch (exception) { console.log('exception', exception) }

    const bindingParams = new MSSQLAdapter(dbClientPools);

    const dataSets = {
        USER_MASTER_ID: '00001',
        STATUS: 'ACTIVE',
        REMARK: 'ແອັກທີບ'
    };

    const updateDataSets = {
        ...dataSets,
        STATUS: 'INACTIVE',
        REMARK: 'ອິນແອັກທີບ'
    };
    const { USER_MASTER_ID, ...updatingDatasets } = updateDataSets;

    const updateBinding = bindingParams.updateBinding(updatingDatasets);

    const queryScript = `
        BEGIN
            DECLARE @USER_MASTER AS TABLE (
            USER_MASTER_ID          VARCHAR(150)            DEFAULT NULL,
            STATUS                  VARCHAR(150)            DEFAULT NULL,
            REMARK                  NVARCHAR(150)           DEFAULT NULL);

            INSERT INTO @USER_MASTER (USER_MASTER_ID, STATUS, REMARK) VALUES 
            ('${dataSets.USER_MASTER_ID}', '${dataSets.STATUS}', N'${dataSets.REMARK}');

            UPDATE @USER_MASTER SET ${updateBinding.value}
            WHERE USER_MASTER_ID = ${USER_MASTER_ID}

            SELECT * FROM @USER_MASTER;

        END
        `;
    const recordsets = await bindingParams.getRequestStatement.query(queryScript);
    console.log('recordset:', recordsets?.recordset);

}

export default updateUsecase;
```

### Deletion params binding usecase.

a usecase of using mssql adaptor deletion params binding.

![Image](https://pub-5aaeaed86d84443285bf87b879339bad.r2.dev/images/image.deletion.png)

- code example to use mssql adaptor deletion param binding.

```typescript
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

async function deleteBinding() {

    const dbClientPools = new mssql.ConnectionPool(dbConfig);

    try { if (!dbClientPools.connected) await dbClientPools.connect() }
    catch (exception) { console.log('exception', exception) }

    const bindingParams = new MSSQLAdapter(dbClientPools);

    const dataSets = {
        USER_MASTER_ID: '00001',
        STATUS: 'ACTIVE',
        REMARK: 'ແອັກທີບ'
    };
    const { REMARK, ...deletingDatasets } = dataSets;

    const updateBinding = bindingParams.deleteBinding(deletingDatasets);

    const queryScript = `
        BEGIN
            DECLARE @USER_MASTER AS TABLE (
            USER_MASTER_ID          VARCHAR(150)            DEFAULT NULL,
            STATUS                  VARCHAR(150)            DEFAULT NULL,
            REMARK                  NVARCHAR(150)           DEFAULT NULL);

            INSERT INTO @USER_MASTER (USER_MASTER_ID, STATUS, REMARK) VALUES 
            ('${dataSets.USER_MASTER_ID}', '${dataSets.STATUS}', N'${dataSets.REMARK}');

            DELETE @USER_MASTER 
            WHERE ${updateBinding.value};
            SELECT * FROM @USER_MASTER;
        END
        `;

    const recordsets = await bindingParams.getRequestStatement.query(queryScript);
    console.log('recordset:', recordsets?.recordset);

}

export default deleteBinding;
```

### Feedback and Suggestions
If you have any questions, feedback, or suggestions, please open an issue on the repository. We're open to discussions and appreciate any input you may have.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.


Feel free to customize the content according to your project's needs and guidelines. A clear and welcoming contribution section can help foster a collaborative and inclusive community around your project.

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

### Package modules.

To updating a modules navigate to here [src/cores/services/mssql.binding.ts](./src/cores/services/mssql.binding.ts) to see a detail.

### Module testing.

After make a change completed. run package.json script to test a module updated completion by using a script below.

```bash
bun run build && bun run test
```

After run test successfully with out error occrur to module updated or previous change. then create Pull request to main branch and wait for review an approval before make a release.



