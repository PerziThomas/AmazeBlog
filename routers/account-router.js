import express from "express";
import Account from "../model/account-model.js";
import passwordHelper from "../utils/password-encrypter.js";

const router = express.Router();

router.post("/", async (req, res) => {
    let password = await passwordHelper.hashPassword(req.body.password);
    let acc = new Account({username: req.body.username, password: password});
    await acc.save();

    res.status(201).send(acc);
});

router.post("/login", async (req, res) => {
    let foundAccount = await Account.findOne({username: req.body.username});

    if (!foundAccount) {
        res.status(404).send("No such account");
        return;
    }

    if (await passwordHelper.checkPassword(req.body.password, foundAccount.password)) {
        res.status(200).send("Success!");
    } else {
        res.status(401).send("Invalid password");
    }
});

export default router;