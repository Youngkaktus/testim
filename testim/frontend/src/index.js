import { bootstrap } from '/frontend/framework/index.js';
import { rootModule } from '/frontend/src/modules/rootModule.js';

document.addEventListener('DOMContentLoaded', () => {
    return bootstrap(rootModule);
});

export { rootModule };
