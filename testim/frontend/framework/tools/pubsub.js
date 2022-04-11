const pubsub = (() => {
    const publish = (name, details = {}, target = window) => {
        return target.dispatchEvent(new CustomEvent(name, {
            bubbles : true, composed : true,
            detail : details
        }));
    };

    const subscribe = (name, handler, target = window) => {
        return target.addEventListener(name, event => {
            return handler(event.detail);
        });
    };

    return { publish, subscribe };
})();

export { pubsub };
