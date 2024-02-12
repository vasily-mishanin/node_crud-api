const request = require('supertest');
import { server } from '../index';

const baseUrl = 'http://localhost:4000';
const testUser = {
  username: 'Alex',
  age: 33,
  hobbies: ['hiking', 'drinking'],
};

const testUser1 = {
  username: 'Bob',
  age: 28,
  hobbies: ['smoking', 'football'],
};

let userId: string = ''; // will get it after creation

afterAll(async () => {
  server.close();
});

describe('Scenario 1 - api/users', () => {
  it('GET api/users', async () => {
    const response = await request(baseUrl).get('/api/users');
    expect(response.body).toEqual({ users: [] });
  });

  it('POST api/users', async () => {
    const response = await request(baseUrl)
      .post('/api/users')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    userId = response.body.user.id;
    expect(response.body.user.username).toEqual(testUser.username);
  });

  it('GET api/users/:id', async () => {
    const response = await request(baseUrl)
      .get(`/api/users/${userId}`)
      .expect(200);
    expect(response.body.user.id).toEqual(userId);
    expect(response.body.user.username).toEqual(testUser.username);
  });

  it('PUT api/users/:id', async () => {
    const response = await request(baseUrl)
      .put(`/api/users/${userId}`)
      .send({ username: 'Alex Waine' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.user.id).toEqual(userId);
    expect(response.body.user.username).toEqual('Alex Waine');
  });

  it('DELETE api/users/:id', async () => {
    const response = await request(baseUrl)
      .delete(`/api/users/${userId}`)
      .expect(204);
  });

  it('GET not existed user at api/users/:id', async () => {
    const response = await request(baseUrl)
      .get(`/api/users/${userId}`)
      .expect(404);
    expect(response.body.message).toEqual(`User with id ${userId} NOT FOUND`);
  });
});

describe('Scenario 2 - api/users', () => {
  it('GET not existed user with wrong ID', async () => {
    const response = await request(baseUrl).get(`/api/users/abc`).expect(400);
    expect(response.body.message).toEqual('Provided user ID is not UUID');
  });

  it('Invalid route', async () => {
    const response = await request(baseUrl)
      .get(`/api/uu/qfre/werf`)
      .expect(404);
    expect(response.body.message).toEqual('Requested resource not found!');
  });

  it('POST api/users', async () => {
    const response = await request(baseUrl)
      .post('/api/users')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    userId = response.body.user.id;
    expect(response.body.user.username).toEqual(testUser.username);
  });

  it('GET api/users', async () => {
    const response = await request(baseUrl).get('/api/users');
    expect(response.body.users.length).toEqual(1);
  });

  it('DELETE api/users/:id', async () => {
    const response = await request(baseUrl)
      .delete(`/api/users/${userId}`)
      .expect(204);
  });

  it('GET api/users', async () => {
    const response = await request(baseUrl).get('/api/users');
    expect(response.body.users.length).toEqual(0);
  });
});

describe('Scenario 3 - api/users', () => {
  it('POST api/users', async () => {
    const response = await request(baseUrl)
      .post('/api/users')
      .send(testUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    userId = response.body.user.id;
    expect(response.body.user.username).toEqual(testUser.username);
  });

  it('DELETE with wring id api/users/:id', async () => {
    const response = await request(baseUrl)
      .delete(`/api/users/abc123`)
      .expect(400);
    expect(response.body.message).toEqual('Provided user ID is not UUID');
  });

  it('POST api/users', async () => {
    const response = await request(baseUrl)
      .post('/api/users')
      .send(testUser1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    userId = response.body.user.id;
    expect(response.body.user.username).toEqual('Bob');
  });

  it('PUT api/users/:id', async () => {
    const response = await request(baseUrl)
      .put(`/api/users/${userId}`)
      .send({ username: 'Bobby Marley' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.user.id).toEqual(userId);
    expect(response.body.user.username).toEqual('Bobby Marley');
  });

  it('GET api/users', async () => {
    const response = await request(baseUrl).get('/api/users');
    expect(response.body.users.length).toEqual(2);
  });

  it('GET one api/users/:id', async () => {
    const response = await request(baseUrl)
      .get(`/api/users/${userId}`)
      .expect(200);
    expect(response.body.user.id).toEqual(userId);
    expect(response.body.user.hobbies[0]).toEqual('smoking');
  });
});
