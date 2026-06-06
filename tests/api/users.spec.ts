import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test('GET users returns 200 and list of users', async ({ request }) => {
  const response = await request.get(`${BASE}/users`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty('id');
  expect(body[0]).toHaveProperty('email');
});

test('GET single user returns 200 and correct data', async ({ request }) => {
  const response = await request.get(`${BASE}/users/1`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.id).toBe(1);
  expect(body).toHaveProperty('email');
  expect(body).toHaveProperty('name');
});

test('POST create user returns 201 and new user data', async ({ request }) => {
  const response = await request.post(`${BASE}/posts`, {
    data: {
      title: 'QA Test Post',
      body: 'Created by Playwright',
      userId: 1,
    },
  });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.title).toBe('QA Test Post');
  expect(body).toHaveProperty('id');
});

test('DELETE user returns 200', async ({ request }) => {
  const response = await request.delete(`${BASE}/posts/1`);
  expect(response.status()).toBe(200);
});