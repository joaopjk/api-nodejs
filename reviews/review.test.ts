import 'jest';
import * as request from 'supertest';
import {environment} from "../common/environment";

test('get /reviews', () => {
    return request('http://localhost:3001')
        .get('/reviews')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        })
        .catch(fail);
});