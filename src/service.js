const { Controller } = require('./controller');

class Service {
    constructor(url) {
        this.url = url;
        this.controller = new Controller();
    }

    async get() {
        if (this.url.length === 1) {
            const data = await this.controller.getPersons();
            return data;
        }

        if (this.url.length === 2) {
            const data = await this.controller.getPerson(this.url[1]);
            return data;
        }
    }

    post() {
        console.log('post method called');
    }

    put() {
        console.log('put method called');
    }

    delete() {
        console.log('delete method called');
    }
}

module.exports = { Service };
