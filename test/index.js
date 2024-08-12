import establishConnection from "./modules.js/connection.test";
import selectionBinding from "./modules.js/selectBinding.test";

(async function () {
    console.log('\nTest Javascript\n');
    await establishConnection();
    await selectionBinding();
})();