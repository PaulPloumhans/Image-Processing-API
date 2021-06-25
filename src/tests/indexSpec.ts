//import testJasmine from '../index';
//import { request } from 'express';
import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('api endpoint testing', () => {
    it('test GET on /api', async () => {
        const res = await request.get('/api');
        expect(res.status).toEqual(200);
    });
    it('test GET on /api/image', async () => {
        const res = await request.get('/api/image');
        expect(res.status).toEqual(200);
    });
});
