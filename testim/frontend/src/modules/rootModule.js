import { Module } from '/frontend/framework/index.js';
import { routes } from '/frontend/config/routes.js';

const rootModule = new Module({
    selector : 'app-root',
    components : [],
    routes : routes
});

export { rootModule };
