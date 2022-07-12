import express from "express";
import dotenv from "dotenv";
import Database from "./database/util/db-connector.js";
import accountRouter from "./routers/account-router.js";

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

async function main() {
    await Database.connect();

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("Hello World! I am running Express!");
    });
    
    app.listen(PORT, HOST, () => {
        registerRouters();
        console.log(`Express Server running and listening on http://${HOST}:${PORT}`);
    });
}

async function registerRouters() {
    app.use("/api/accounts", accountRouter);
}

main();