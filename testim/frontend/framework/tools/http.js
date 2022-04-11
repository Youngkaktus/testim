const http = (method = 'post', options = {}) => {
    options.url = options.url || '';
    options.request = !options.request || `request=${JSON.stringify(options.request)}`;
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, options.url);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send(options.request);
        request.addEventListener('readystatechange', function() {
            if(this.readyState === 4) {
                if(this.status >= 200 && this.status < 400) {
                    return resolve(request.response);
                } else { return reject(this.status); }
            }
        });
    });
};

export { http };
