const cookie = (() => {
    const get = name => {
        const results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return results ? results[2] : '';
    };

    const set = (name, value, expires = 730) => {
        const date = new Date();
        date.setDate(date.getDate() + expires);
        document.cookie = name + '=' + value + '; path=/; expires=' + date.toUTCString();
        return value;
    };

    const erase = name => {
        return set(name, false, -1);
    };

    return { get, set, erase };
})();

export { cookie };
