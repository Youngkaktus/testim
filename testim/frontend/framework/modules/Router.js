import { pubsub } from '../tools/index.js';

class Router {
    constructor(routes, display) {
        this._routes = routes;
        this._display = display;
        this._urls = [];
        this._initComponents();
        this._resetActiveComponent();
    }

    _initComponents() {
        return Object.values(this._routes).forEach(value => {
            return value.component.init();
        });
    }

    static url() {
        return window.location.href;
    }

    static relativeUrl() {
        return new URL(Router.url()).pathname;
    }

    static getRelativeUrlFrom(url) {
        return new URL(url).pathname;
    }

    static urlSearch() {
        return new URL(Router.url()).search;
    }

    _getUrlObject(url) {
        return this._routes[url] || this._routes['*'] || {};
    }

    async _updateState(title, url, search = Router.urlSearch()) {
        document.title = title;
        return window.history.pushState(null, '', `${url}${search}`);
    }

    _resetActiveComponent() {
        this._activeComponent = {
            name : null, cache : undefined
        };
    }

    _exchangeActiveComponent(name, cache) {
        this._activeComponent = {
            name : name, cache : cache
        };
    }

    _removeActiveComponent() {
        return this._display.querySelector(this._activeComponent.name).remove();
    }

    _hideActiveComponent() {
        this._display.querySelector(this._activeComponent.name).style.display = 'none';
    }

    _componentIsConnected(name) {
        return this._display.querySelector(name);
    }

    _showComponent(name) {
        this._display.querySelector(name).style = '';
    }

    _connectComponent(name) {
        return this._display.appendChild(document.createElement(name));
    }

    _processActiveComponent() {
        if(!this._activeComponent.name) return;
        this._activeComponent.cache ?
            this._hideActiveComponent() :
            this._removeActiveComponent();
        return this._resetActiveComponent();
    }

    _handleUrl(url = Router.relativeUrl()) {
        const object = this._getUrlObject(url);
        this._updateState(object.title, url);
        this._processActiveComponent();
        this._componentIsConnected(object.component.getName()) ?
            this._showComponent(object.component.getName()) :
            this._connectComponent(object.component.getName());
        return this._exchangeActiveComponent(object.component.getName(), object.cache);
    }

    _openLink(event) {
        if(event.outside !== null) { window.location.href = event.link; return; }
        const url = Router.getRelativeUrlFrom(event.link);
        this._urls.push(url);
        return this._handleUrl(url);
    }

    _popState() {
        if(this._urls.length === 1) return window.history.back();
        this._urls.pop();
        return this._handleUrl(this._urls[this._urls.length - 1]);
    }

    _bind() {
        pubsub.subscribe('openlink', event => { // from components
            return this._openLink(event);
        });
        window.addEventListener('popstate', event => {
            return this._popState();
        });
    }

    init() {
        this._urls.push(Router.relativeUrl());
        this._bind();
        return this._handleUrl();
    }
}

export { Router };
