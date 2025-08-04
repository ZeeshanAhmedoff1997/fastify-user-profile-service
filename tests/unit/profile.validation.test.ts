import { describe, it, beforeAll, expect } from 'vitest';
import supertest from 'supertest';
import { buildApp } from '../../src/app';

const app = buildApp();
const request = supertest(app.server);

beforeAll(async () => {
  await app.ready();
});

describe('Profile Route Validation & Error Handling', () => {
  it('POST /profiles -> should fail with missing required fields', async () => {
    const res = await request.post('/profiles').send({
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('statusCode', 400);
    expect(res.body.message).toContain('firstName');
  });

  it('POST /profiles -> should fail with invalid date format', async () => {
    const res = await request.post('/profiles').send({
      firstName: 'Jane',
      lastName: 'Doe',
      dateOfBirth: '01-01-2000',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/YYYY-MM-DD format/);
  });

  it('PUT /profiles/invalid-id -> should fail with param validation error', async () => {
    const res = await request.put('/profiles/abc').send({
      firstName: 'Test',
      lastName: 'User',
      dateOfBirth: '2000-01-01',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('ID must be a number');
  });

  it('GET /profiles/invalid-id -> should fail with param validation error', async () => {
    const res = await request.get('/profiles/foo');
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('ID must be a number');
  });

  it('POST /profiles -> should fail with empty strings', async () => {
    const res = await request.post('/profiles').send({
      firstName: '',
      lastName: '',
      dateOfBirth: '2000-01-01',
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('firstName');
    expect(res.body.message).toContain('lastName');
  });
});
