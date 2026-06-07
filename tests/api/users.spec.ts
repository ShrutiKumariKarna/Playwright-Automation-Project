import { test, expect } from '@playwright/test';

// using jsonplaceholder as a free public API for testing
const BASE = 'https://jsonplaceholder.typicode.com';

test('GET users returns a list of users', async ({ request }) => {
  const res = await request.get(`${BASE}/users`);
  expect(res.status()).toBe(200);

  const body = await res.json();
  // should have multiple users
  expect(body.length).toBeGreaterThan(0);
  // each user should have these fields
  expect(body[0]).toHaveProperty('id');
  expect(body[0]).toHaveProperty('email');
});

test('GET single user returns correct data', async ({ request }) => {
  const res = await request.get(`${BASE}/users/1`);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.id).toBe(1);
  expect(body).toHaveProperty('name');
  expect(body).toHaveProperty('email');
});

test('POST request creates a new user', async ({ request }) => {
  const res = await request.post(`${BASE}/posts`, {
    data: {
      title: 'QA Test Post',
      body: 'Created by Playwright',
      userId: 1,
    },
  });
  expect(res.status()).toBe(201);

  const body = await res.json();
  // new post should come back with an id
  expect(body).toHaveProperty('id');
  expect(body.title).toBe('QA Test Post');
});

test('DELETE request removes a post', async ({ request }) => {
  const res = await request.delete(`${BASE}/posts/1`);
  // jsonplaceholder returns 200 for delete
  expect(res.status()).toBe(200);
});