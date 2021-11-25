const crypto = require('crypto');
const { Controller } = require('./controller');

class Service {
    constructor(url) {
        this.url = url;
        this.controller = new Controller();
    }

    async get() {
        if (this.url.length === 1) {
            const personList = await this.controller.getPersons();
            return personList;
        }

        if (this.url.length === 2) {
            const person = await this.controller.getPersonById(this.url[1]);
            return person;
        }
    }

    async post(payload) {
        const person = await this.controller.createPerson(payload)
            .catch((err) => {
                return JSON.stringify({ message: err.message });
            });
        return person;
    }

    put() {
        console.log('put method called');
    }

    delete() {
        console.log('delete method called');
    }
}

module.exports = { Service };
