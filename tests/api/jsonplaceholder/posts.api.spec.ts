import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('GET /posts/1 returns the post', async ({ request }) => {
    const res = await request.get(`${BASE}/posts/1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
  });

  test('GET /posts returns 100 posts', async ({ request }) => {
    const res = await request.get(`${BASE}/posts`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(100);
  });

  test('POST /posts creates a post', async ({ request }) => {
    const res = await request.post(`${BASE}/posts`, {
      data: { title: 'foo', body: 'bar', userId: 1 },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.title).toBe('foo');
    expect(body.id).toBeDefined();
  });

  test('DELETE /posts/1 succeeds', async ({ request }) => {
    const res = await request.delete(`${BASE}/posts/1`);
    expect(res.status()).toBe(200);
  });

  test('GET an unknown post returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/posts/9999`);
    expect(res.status()).toBe(404);
  });
});