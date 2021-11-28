const request = require('supertest');
const { main } = require('../src/index');

describe('Test db', () => {
    let server;
    let personId;
    let person = {
        name: 'John Doe',
        age: 25,
        hobbies: ['program', 'run'],
    };
    let newPerson = {
        name: 'John Smith',
        age: 30,
        hobbies: ['gaming', 'sleeping'],
    };

    beforeAll(() => {
        server = main();
    });

    test('Get person list from db', async () => {
        const response = await request(server).get('/person');

        expect(response.body).toEqual([]);
    });

    test('Save person to db', async () => {
        const response = await request(server).post('/person').send(person);

        expect(response.body.name).toBe('John Doe');
        expect(response.body.age).toBe(25);
        expect(response.body.hobbies).toEqual(['program', 'run']);
        personId = response.body.id;
    });

    test('Get person by id', async () => {
        const response = await request(server).get(`/person/${personId}`);

        expect(response.body).toEqual({
            id: personId,
            ...person,
        });
    });

    test('Update person by id', async () => {
        const response = await request(server).put(`/person/${personId}`).send(newPerson);

        expect(response.body).toEqual({
            id: personId,
            ...newPerson,
        });
    });

    test('Delete person by id', async () => {
        const response = await request(server).delete(`/person/${personId}`);

        expect(response.statusCode).toEqual(204);
    });

    test('Get person by id', async () => {
        const response = await request(server).get(`/person/${personId}`);

        expect(response.statusCode).toEqual(404);
    });
});