import { notFoundPage } from '/frontend/src/pages/notFoundPage.js';

const routes = {
    '*' : {
        title : 'Error 404', cache : true,
        component : notFoundPage
    }
};

export { routes };
