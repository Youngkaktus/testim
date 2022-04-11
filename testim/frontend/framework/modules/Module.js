import { fw } from '../tools/index.js';
import { Router } from './Router.js';

class Module {
    constructor(config) {
        this._selector = config.selector || null;
        this._components = config.components || [];
        this._routes = config.routes;
    }

    _initRouter() {
        const display = document.body.querySelector(this._selector) ||
            fw.error(`bootstrap element not found (${this.selector})`);
        return new Router(this._routes, display).init();
    }

    init() {
        !fw.isUndefined(this._routes) && this._initRouter();
        return this._components.forEach(component => {
            return component.init();
        });
    }
}

export { Module };
