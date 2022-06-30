import mongoose from "mongoose";
import Account from "../../model/account-model.js";
import passwordHelper from "../../utils/password-encrypter.js";

const Database = {
    connect: connect
}

async function connect() {
    await mongoose.connect(process.env.DB_STRING, {
        serverSelectionTimeoutMS: 10000
    });

    let count = await Account.count();

    if(count === 0) {
        await createRootAccount();
    }

    console.log("Connected to the database!");
}

async function createRootAccount() {
    let root = new Account({username: process.env.ROOT_USER, password: await passwordHelper.hashPassword(process.env.ROOT_PASS)})
    await root.save();
}

export default Database;