import express from "express";
import dotenv from "dotenv";
import Database from "./database/util/db-connector.js";
import accountRouter from "./routers/account-router.js";
import checkUserByJWT from "./security/authorization.js";
import handleError from "./error/error-handling.js";

dotenv.config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const app = express();

async function main() {
    await Database.connect();

    app.use(express.json());
    registerRouters();
    
    app.listen(PORT, HOST, () => {
        console.log(`Express Server running and listening on http://${HOST}:${PORT}`);
    });
}

async function registerRouters() {

    app.use(checkUserByJWT);
    app.use("/api/accounts", accountRouter);

    app.use(handleError);
}

main();