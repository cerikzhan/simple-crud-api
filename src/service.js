const { Controller } = require('./controller');
const { urlValidator } = require('./url-validator');
const { CustomError } = require('./errors');

class Service {
    constructor(url) {
        this.url = urlValidator(url);
        this.controller = new Controller();
    }

    async get() {
        if (this.url.length === 1) {
            const personList = await this.controller.getPersons();
            return personList;
        }

        if (this.url.length === 2) {
            const person = await this.controller.getPersonById(this.url[1])
                .catch((err) => {
                    throw err;
                });
            return person;
        }

        throw new CustomError(500, 'Something went wrong');
    }

    async post(payload) {
        if (this.url.length !== 1) throw new CustomError(404, 'Not valid url');
        const person = await this.controller.createPerson(payload)
            .catch((err) => {
                throw err;
            });
        return person;
    }

    async put(payload) {
        if (this.url.length !== 2) throw new CustomError(500, 'Have not person id');
        const person = await this.controller.updatePerson({ id: this.url[1], ...payload })
            .catch((err) => {
                throw err;
            });
        return person;
    }

    async delete() {
        if (this.url.length !== 2) throw new CustomError(500, 'Have not person id');
        const data = await this.controller.deletePerson(this.url[1])
            .catch((err) => {
                throw err;
            });
        return data;
    }
}

module.exports = { Service };
