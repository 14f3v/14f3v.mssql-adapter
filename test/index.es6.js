import establishConnection from "./modules.js/connection.test";
import selectionBinding from "./modules.js/selectBinding.test";
import insertBinding from "./modules.js/insertBinding.test";

(async function () {
    console.log('\nTest Javascript\n');
    await establishConnection();
    await selectionBinding();
    await insertBinding();
})();