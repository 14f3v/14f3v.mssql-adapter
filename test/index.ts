import establishConnection from "./modules.ts/connection.test";
import selectionBinding from "./modules.ts/selectBinding.test";
import insertBinding from "./modules.ts/insertBinding.test";

(async function () {
    console.log('\nTest Typescript\n');
    await establishConnection();
    await selectionBinding();
    await insertBinding();
})();