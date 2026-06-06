import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test('GET post that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${BASE}/posts/99999`);
  expect(response.status()).toBe(404);
});

test('GET user that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${BASE}/users/99999`);
  expect(response.status()).toBe(404);
});

test('POST with empty body still returns 201', async ({ request }) => {
  const response = await request.post(`${BASE}/posts`, {
    data: {},
  });
  expect(response.status()).toBe(201);
});