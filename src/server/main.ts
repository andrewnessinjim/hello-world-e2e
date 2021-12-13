import express from "express"
import * as db from "./dao/db";
import homepage from "./dao/homepage";


const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

boot();

async function boot() {
    await db.connect()
    const app = express();
    setUpRoutes(app);
}

async function setUpRoutes(app) {
    app.set("view engine", "pug");
    app.use(express.static("public"));

    const useExternalStyles = !isDevelopment;
    const scriptRoot = isDevelopment ? "http://localhost:8080" : "/build";
    
    app.get("/", async (req, res) => {
        const {message} = await homepage.getHomePageData();

        res.render("index",{
            useExternalStyles,
            scriptRoot,
            message
        });
    });

    app.listen(PORT, () => {
        console.log(`Hello world running on port ${PORT}`);
    });
}