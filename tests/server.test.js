import request from 'supertest';
import {server} from "../src/aplication/server.js";

describe('GET /', () => {
  test('response with json', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello world");
  });
});





