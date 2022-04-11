const fw = (() => {
    const isUndefined = a => {
        return typeof a === 'undefined';
    };

    const error = text => {
        throw new Error(text);
    };

    const delegate = (selector, handler) => event => {
        return event.target.closest(selector) && handler(event);
    };

    return { isUndefined, error, delegate };
})();

export { fw };
