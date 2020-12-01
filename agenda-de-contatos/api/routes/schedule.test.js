import app from '../server';
import request from 'supertest';

describe('Rotas', () => {
  it('get', async () => {
    const res = await request(app).get('/schedule');
    expect(res.body).toBeDefined();
    expect(res.statusCode).toEqual(200);
  });

  it('post', async () => {
    const user = {
      name: 'matheus',
      number: 1654156,
      uf: 'MG',
      localidade: 'Lavras',
      bairro: 'teste',
      logradouro: 'logra',
    };
    const res = await request(app).post('/schedule').send(user);

    expect(res.statusCode).toEqual(200);
  });

  it('delete', async () => {
    const res = await request(app).delete('/schedule/5');

    expect(res.statusCode).toEqual(200);
  });

  it('update', async () => {
    const res = await request(app).put('/schedule/7').send({ number: 55555 });

    expect(res.statusCode).toEqual(200);
  });

  it('getName', async () => {
    const res = await request(app).get('/schedule/matheus');
    const res2 = await request(app).get('/schedule/jose');

    expect(res.statusCode).toEqual(200);
    expect(res2.statusCode).toEqual(200);
  });
});
