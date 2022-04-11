import { Component } from '/frontend/framework/index.js';

const mainPage = new Component({
    name : 'main-page',
    template : `
        <h1>Добро пожаловать!</h1>
        <div>
            <a href='/login'>Войти</a>
            <a href='/sign-up'>Зарегистрироваться</a>
        </div>
        `

});

export { mainPage };
