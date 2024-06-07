import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello Response`);
});

test('Test Query Parameter', async () => {
    const response = await request(app).get("/").query({ name: "Tian" });
    expect(response.text).toBe("Hello Response");
});