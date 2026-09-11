import { test, expect } from '@playwright/test';

test.describe('API Test Suite', () => {
  const baseURL = 'https://reqres.in';

  test('POST /api/register - valid registration', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol'
      }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.token).toBeDefined();
  });

  test('POST /api/register - missing field error cases', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/register`, {
      data: {
        email: 'sydney@fife'
      }
    });
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('POST /api/login - successful login', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
  });

  test('POST /api/login - missing password scenario', async ({ request }) => {
    const response = await request.post(`${baseURL}/api/login`, {
      data: {
        email: 'peter@klaven'
      }
    });
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });

  test('GET /api/users?page=2 - verify response schema and data types', async ({ request }) => {
    const response = await request.get(`${baseURL}/api/users?page=2`);
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(typeof body.page).toBe('number');
    expect(body.page).toBe(2);
    expect(typeof body.per_page).toBe('number');
    expect(typeof body.total).toBe('number');
    expect(typeof body.total_pages).toBe('number');
    expect(Array.isArray(body.data)).toBeTruthy();
    
    // Verify first user schema in the array
    if (body.data.length > 0) {
      const user = body.data[0];
      expect(typeof user.id).toBe('number');
      expect(typeof user.email).toBe('string');
      expect(typeof user.first_name).toBe('string');
      expect(typeof user.last_name).toBe('string');
      expect(typeof user.avatar).toBe('string');
    }
  });

  test('PUT /api/users/2 - update a user record and verify all response fields', async ({ request }) => {
    const response = await request.put(`${baseURL}/api/users/2`, {
      data: {
        name: 'morpheus',
        job: 'zion resident'
      }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('zion resident');
    expect(body.updatedAt).toBeDefined();
    expect(typeof body.updatedAt).toBe('string');
  });

  test('DELETE /api/users/2 - verify 204 status code and empty response body', async ({ request }) => {
    const response = await request.delete(`${baseURL}/api/users/2`);
    
    expect(response.status()).toBe(204);
    
    // Playwright returns empty string/buffer for 204
    const text = await response.text();
    expect(text).toBe('');
  });
});
