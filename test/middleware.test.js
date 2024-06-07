import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
    console.info(`Receive request: ${req.method} ${req.originalUrl}`);
    next();
};

const addPoweredHeader = (req, res, next) => {
    res.set("X-Powered-By", "Christian");
    next();
};

const apiKeyMiddleware = (req, res, next) => {
    if(req.query.apiKey){
        next();
    }else{
        res.status(401).end();
    }
};

const requestTimeMiddleware = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

const app = express();

app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get('/', (req, res) => {
    res.send(`Hello Response`);
});

app.get('/tian', (req, res) => {
    res.send(`Hello Tian`);
});

app.get('/time', (req, res) => {
    res.send(`Hello , Today Is ${req.requestTime}`);
});

test("Test Response Middleware", async () => {
    const response = await request(app).get("/").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Christian");
    expect(response.text).toBe("Hello Response");
});

test("Test Response Middleware 2", async () => {
    const response = await request(app).get("/tian").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Christian");
    expect(response.text).toBe("Hello Tian");
});

test("Test Response Middleware Unauthorized", async () => {
    const response = await request(app).get("/tian");
    expect(response.status).toBe(401);
});

test("Test Response Middleware Time", async () => {
    const response = await request(app).get("/time").query({apiKey: "123"});
    expect(response.get("X-Powered-By")).toBe("Christian");
    expect(response.text).toContain("Hello , Today Is");
});