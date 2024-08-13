import establishConnection from "./modules.js/connection.test";
import selectionBinding from "./modules.js/selectBinding.test";
import insertBinding from "./modules.js/insertBinding.test";
import updateBinding from "./modules.ts/updateBinding.test";
import deleteBinding from "./modules.ts/deleteBinding.test";

(async function () {
    console.log('\nTest Javascript\n');
    await establishConnection();
    await selectionBinding();
    await insertBinding();
    await updateBinding();
    await deleteBinding();
})();