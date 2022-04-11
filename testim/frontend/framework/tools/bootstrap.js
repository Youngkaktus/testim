const bootstrap = (module, ...modules) => {
    return [module, ...modules].forEach(m => {
        return m.init();
    });
};

export { bootstrap };
