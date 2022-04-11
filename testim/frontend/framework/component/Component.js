import { pubsub, fw } from '../tools/index.js';

const register = config => {
    return window.customElements.define(config.name, class extends HTMLElement {
        constructor() { super();
            this._script = config.script;
            this._events = config.events;
            this._methods = config.methods;
            this._data = config.data;
            this._template = config.template;
            this._style = config.style;
            this._shadowRoot = this.attachShadow({mode : 'open'});
            this._init();
        }

        async _processTemplate(template, data, style) {
            if(style) template += `<style>${style}</style>`;
            if(data) { data = await data;
                Object.keys(data).forEach(key => {
                    template = template.replace(new RegExp(`{{ ${key} }}`, 'g'), `${data[key]}`);
                });
            }
            return new Range().createContextualFragment(template);
        }

        _initHandlers() {
            return this._shadowRoot.addEventListener('click', fw.delegate('a', event => {
                event.preventDefault();
                return pubsub.publish('openlink', { // for router
                    link : event.target.href,
                    outside : event.target.getAttribute('outside')
                });
            }));
        }

        _initEvents() {
            if(fw.isUndefined(this._events)) return;
            fw.isUndefined(this._methods) && fw.error('methods are not initialized');
            return Object.keys(this._events).forEach(key => { const es = key.split('(');
                const [event, selector, method] = [es[0], es[1].replace(')', ''), this._events[key]];
                return this._shadowRoot.addEventListener(event, fw.delegate(selector, e => {
                    return this._methods[method](e);
                }));
            });
        }

        _init() {
            return (this._initHandlers(), this._initEvents());
        }

        async connectedCallback() {
            const template = await this._processTemplate(
                this._template || '', this._data || {}, this._style || ''
            ); this._script && this._script();
            return this._shadowRoot.appendChild(template.cloneNode(true));
        }
    });
};

class Component {
    constructor(config) { this._config = config; }

    getName() { return this._config.name; }

    init() { return register(this._config); }
}

export { Component };
