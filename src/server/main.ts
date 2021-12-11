import express from "express"

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("<p>Hello World!<p>");
})

app.listen(PORT, () => {
    console.log(`Hello world running on port ${PORT}`);
})