import http from "http";
import fs from "fs";
import path from "path";

import express from "express"
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import * as db from "./dao/db";
import Query from "./resolvers/Query";
import checkHealth from "./health";

const PORT = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== "production";

boot();

async function boot() {
    await db.connect()
    const app = express();
    setUpRoutes(app);
    startApolloServer(app);
}

async function startApolloServer(app) {
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, "schema.graphql"),
            "utf-8"
        ),
        resolvers: {
            Query
        },
        plugins: [ ApolloServerPluginDrainHttpServer({httpServer}) ]
    });

    await server.start();
    server.applyMiddleware({
        app
    });

    await new Promise(resolve => httpServer.listen({port: PORT}, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);

}

async function setUpRoutes(app) {
    app.set("view engine", "pug");
    app.use(express.static("public"));

    const useExternalStyles = !isDevelopment;
    const scriptRoot = isDevelopment ? "http://localhost:8080" : "/build";
    
    app.get("/healthcheck", (req, res) => {
        const health = checkHealth();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(health));
    });

    app.get("/", async (req, res) => {
        res.render("index",{
            useExternalStyles,
            scriptRoot
        });
    });
}