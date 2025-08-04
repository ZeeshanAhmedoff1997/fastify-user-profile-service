
import { describe, it, beforeAll, expect } from 'vitest';
import supertest from 'supertest';
import { buildApp } from '../../src/app';

const app = buildApp();
const request = supertest(app.server);

beforeAll(async () => {
  await app.ready();
});

describe('Profile Routes Integration', () => {
  let createdId: number;

  it('GET /profiles -> should return array', async () => {
    const res = await request.get('/profiles');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('POST /profiles -> should create a new profile', async () => {
    const res = await request.post('/profiles').send({
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: '2000-01-01'
    });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('id');
    createdId = res.body.data.id;
  });

  it('GET /profiles/:id -> should return created profile', async () => {
    const res = await request.get(`/profiles/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.id).toBe(createdId);
  });

  it('PUT /profiles/:id -> should update the profile', async () => {
    const res = await request.put(`/profiles/${createdId}`).send({
      firstName: 'Updated',
      lastName: 'User',
      dateOfBirth: '1999-12-31'
    });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.firstName).toBe('Updated');
  });

  it('GET /profiles/:id -> non-existent should return 404', async () => {
    const res = await request.get('/profiles/999999');
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });

  it('PUT /profiles/:id -> non-existent should return 404', async () => {
    const res = await request.put('/profiles/999999').send({
      firstName: 'Ghost',
      lastName: 'User',
      dateOfBirth: '1990-01-01'
    });

    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });
});
