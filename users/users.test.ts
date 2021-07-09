import 'jest';
import * as request from 'supertest';

test('get /users', () => {
    return request('http://localhost:3001')
        .get('/users')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        }).catch(fail);
});

test('post /users', () => {
    return request('http://localhost:3001')
        .post('/users')
        .send({
            name: 'User test',
            email: 'usuarioteste@gmail.com',
            password: '1234',
            cpf: '431.923.650-56'
        })
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('User test');
            expect(response.body.email).toBe('usuarioteste@gmail.com');
            expect(response.body.cpf).toBe('431.923.650-56');
            expect(response.body.password).toBeUndefined();
        }).catch(fail);
});

test('get /user/aaa - not found', () => {
    return request('http://localhost:3001')
        .get('/users/aaa')
        .then(response => {
            expect(response.status).toBe(404);
        }).catch(fail);
});

test('patch /users/:id', () => {
    return request('http://localhost:3001')
        .post('/users')
        .send({
            name: 'User test 2',
            email: 'usuarioteste2@gmail.com',
            password: '1234'
        })
        .then(response => {
            request('http://localhost:3001')
                .patch(`/users/${response.body._id}`)
                .send({
                    name: 'User test 2 - Patch'
                })
                .then(response => {
                    expect(response.status).toBe(200);
                    expect(response.body._id).toBeDefined();
                    expect(response.body.name).toBe('User test 2 - Patch');
                    expect(response.body.email).toBe('usuarioteste2@gmail.com');
                    expect(response.body.password).toBeUndefined();
                })
                .catch(fail)
        }).catch(fail);
});

