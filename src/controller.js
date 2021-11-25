const crypto = require('crypto');
const { persons } = require('./data');

class Controller {
    async getPersons() {
        return new Promise((resolve) => resolve(persons));
    }

    async getPersonById(id) {
        return new Promise((resolve, reject) => {
            let person = persons.find((person) => person.id === id);

            if (person) {
                resolve(person);
            } else {
                reject(new Error(`Person with id ${id} not found`));
            }
        });
    }

    async createPerson(payload) {
        return new Promise((resolve, reject) => {
            if (!payload.name || !payload.age || !payload.hobbies?.length) {
                reject(new Error('All fields required'));
            }

            let newPerson = {
                id: crypto.randomUUID(),
                name: payload.name,
                age: payload.age,
                hobbies: payload.hobbies,
            };

            persons.push(newPerson);

            resolve(newPerson);
        });
    }

    async updatePerson(payload) {
        return new Promise((resolve, reject) => {
            const index = persons.findIndex((person) => person.id === payload.id);
            if (index === -1) {
                reject(`${personId} not found`);
            }

            if (!payload.name || !payload.age || !payload.hobbies?.length) {
                reject(new Error('Not correct data'));
            }

            persons.splice(index, 1, payload);
            resolve(payload);
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
