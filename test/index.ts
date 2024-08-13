import establishConnection from "./modules.ts/connection.test";
import selectionBinding from "./modules.ts/selectBinding.test";
import insertBinding from "./modules.ts/insertBinding.test";
import updateBinding from "./modules.ts/updateBinding.test";
import deleteBinding from "./modules.ts/deleteBinding.test";

(async function () {
    console.log('\nTest Typescript\n');
    await establishConnection();
    await selectionBinding();
    await insertBinding();
    await updateBinding();
    await deleteBinding();
})();