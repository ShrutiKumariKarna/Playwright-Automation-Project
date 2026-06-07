import { test, expect } from '@playwright/test';

// negative API tests - checking how the API handles bad requests
const BASE = 'https://jsonplaceholder.typicode.com';

test('GET post that does not exist returns 404', async ({ request }) => {
  // using a really high id that definitely doesnt exist
  const res = await request.get(`${BASE}/posts/99999`);
  expect(res.status()).toBe(404);
});

test('GET user that does not exist returns 404', async ({ request }) => {
  const res = await request.get(`${BASE}/users/99999`);
  expect(res.status()).toBe(404);
});

test('POST with empty body still gets a response', async ({ request }) => {
  // jsonplaceholder accepts empty body and still returns 201
  const res = await request.post(`${BASE}/posts`, {
    data: {},
  });
  expect(res.status()).toBe(201);
});