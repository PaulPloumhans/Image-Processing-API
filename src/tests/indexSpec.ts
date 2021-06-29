//import testJasmine from '../index';
//import { request } from 'express';
import supertest from 'supertest';
import app from '../index';
import { resize } from '../utilities/resize_promises';

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

describe('images processing testing', () => {
    it('test that image resizing resolves when valid parameters are used', async () => {
        await expectAsync(resize('halfdome', 250, 250)).toBeResolved();
    });
    it('test that image resizing with inexistent file rejects', async () => {
        await expectAsync(resize('halfdome_', 250, 250)).toBeRejected();
    });
    it('test that image resizing with 0 width rejects', async () => {
        await expectAsync(resize('halfdome', 0, 250)).toBeRejected();
    });
    it('test that image resizing with 0 height rejects', async () => {
        await expectAsync(resize('halfdome', 250, 0)).toBeRejected();
    });
});
