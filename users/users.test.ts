import 'jest';
import * as request from 'supertest';
import {Server} from "../server/server";
import {environment} from "../common/environment";
import {usersRouter} from "./user.router";
import {User} from "./users.model";

let server: Server;

beforeAll(() => {
    environment.db.url = 'mongodb://localhost/meat-api-test-db';
    environment.server.port = 3001
    server = new Server();
    return server
        .bootstrap([usersRouter])
        .then(()=>{
            User.remove({})
                .exec();
        })
        .catch(console.error)
})

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

afterAll(()=>{
    return server.shutDown();
})