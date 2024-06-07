import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("CONTOHRAHASIA"));
app.use(express.json());

app.get('/', (req, res) => {
    const name = req.signedCookies["Login"];
    res.send(`Hello ${name}`);
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    res.cookie("Login", name, {path: '/', signed: true});
    res.send(`Hello ${name}`);
});

test('Test Cookie Read', async () => {
    const response = await request(app).get('/')
        .set('Cookie', "Login=s%3ATian.XdPEqHP%2FgvqJdNSA4bYyCvkghtPE%2FF6m%2BMPuljI8UqY; Path=/");
    expect(response.text).toBe("Hello Tian");
});

test('Test Cookie Write', async () => {
    const response = await request(app).post('/login')
        .send({ name: "Tian" });
    console.info(response.get("Set-Cookie"));
    expect(response.get("Set-Cookie").toString()).toContain("Tian");
    expect(response.text).toBe("Hello Tian");
});