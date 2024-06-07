import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Helo World");
});

app.get('/tian', (req, res) => {
    res.send("Hello Tian");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});