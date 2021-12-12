import express from "express"

const app = express();
const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

app.set("view engine", "pug");

const useExternalStyles = !isDevelopment;
const scriptRoot = isDevelopment ? "http://localhost:8080" : "/build";

app.get("/", (req, res) => {
    res.render("index",{
        useExternalStyles,
        scriptRoot
    });
});

app.listen(PORT, () => {
    console.log(`Hello world running on port ${PORT}`);
});