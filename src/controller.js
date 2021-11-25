const crypto = require('crypto');
const { persons } = require('./data');

class Controller {
    async getPersons() {
        return new Promise((resolve) => resolve(JSON.stringify(persons)));
    }

    async getPerson(id) {
        return new Promise((resolve, reject) => {
            let person = persons.find((person) => person.id === id);

            if (person) {
                resolve(JSON.stringify(person));
            } else {
                reject(new Error(`Person with id ${id} not found`));
            }
        });
    }

    async createPerson(todo) {
        return new Promise((resolve) => {
            let newPerson = {
                id: crypto.randomUUID(),
                ...todo,
            };

            resolve(JSON.stringify(newPerson));
        });
    }

    async updatePerson(payload) {
        return new Promise((resolve, reject) => {
            const index = persons.findIndex((person) => person.id === payload.id);
            if (index === -1) {
                reject(`${payload.name} not found`);
            }

            persons.splice(index, 1, payload);
            resolve(JSON.stringify(payload));
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            const index = persons.findIndex((person) => person.id === id);
            if (index === -1) {
                reject(`Person with id ${id} not found`);
            }

            persons.splice(index, 1);
            resolve('Person deleted successfully');
        });
    }
}

module.exports = { Controller };
