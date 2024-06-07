import express from 'express';
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.set({
        "X-Powered-By": "Christian",
        "X-Author": "Tian"
    });
    res.send(`Hello Response`);
});

test('Test Response Header', async () => {
    const response = await request(app).get("/").query({ name: "Tian" });
    expect(response.text).toBe("Hello Response");
    expect(response.get("X-Powered-By")).toBe("Christian");
    expect(response.get("X-Author")).toBe("Tian");
});