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
                return { message: err.message };
            });
        return person;
    }

    async put(payload) {
        const person = await this.controller.updatePerson({ id: this.url[1], ...payload })
            .catch((err) => {
                return { message: err.message };
            });
        return person;
    }

    delete() {
        console.log('delete method called');
    }
}

module.exports = { Service };
