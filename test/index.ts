import establishConnection from "./modules.ts/connection.test";
import selectionBinding from "./modules.ts/selectBinding.test";

(async function () {
    console.log('\nTest Typescript\n');
    await establishConnection();
    await selectionBinding();
})();