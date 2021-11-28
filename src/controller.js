const { v4: uuidv4 } = require('uuid');
const { persons } = require('./data');
const { CustomError } = require('./errors');

class Controller {
    async getPersons() {
        return new Promise((resolve) => resolve({ statusCode: 200, body: persons }));
    }

    async getPersonById(id) {
        return new Promise((resolve, reject) => {
            let person = persons.find((person) => person.id === id);

            if (person) {
                resolve({ statusCode: 200, body: person });
            } else {
                reject(new CustomError(404, `Person with id ${id} not found`));
            }
        });
    }

    async createPerson(payload) {
        return new Promise((resolve, reject) => {
            if (!payload.name || !payload.age || !payload.hobbies?.length) {
                reject(new CustomError(400, 'All fields required'));
            }

            const newPerson = {
                id: uuidv4(),
                name: payload.name,
                age: payload.age,
                hobbies: payload.hobbies,
            };

            persons.push(newPerson);

            resolve({ statusCode: 201, body: newPerson });
        });
    }

    async updatePerson(payload) {
        return new Promise((resolve, reject) => {
            const index = persons.findIndex((person) => person.id === payload.id);
            if (index === -1) {
                reject(new CustomError(404, `${personId} not found`));
            }

            if (!payload.name || !payload.age || !payload.hobbies?.length) {
                reject(new CustomError(400, 'Not correct data'));
            }

            persons.splice(index, 1, payload);
            resolve({ statusCode: 200, body: payload });
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            const index = persons.findIndex((person) => person.id === id);
            if (index === -1) {
                reject(new CustomError(404, `Person with id ${id} not found`));
            }
            persons.splice(index, 1);
            resolve({ statusCode: 204, body: { message: 'Person deleted successfully' } });
        });
    }
}

module.exports = { Controller };
