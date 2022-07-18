import express from "express";
import Account from "../model/account-model.js";
import passwordHelper from "../utils/password-encrypter.js";
import jwtHelper from "../security/jwt-helper.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        let password = await passwordHelper.hashPassword(req.body.password);
        let acc = new Account({username: req.body.username, password: password});
        await acc.save();
    
        delete acc._doc.password;
        res.status(201).send(acc);
    } catch(err) {
        next(err);
    }

});

router.post("/login", async (req, res, next) => {
    try {
        let foundAccount = await Account.findOne({username: req.body.username});

        if (!foundAccount) {
            res.status(404).send("No such account");
            return;
        }
    
        if (await passwordHelper.checkPassword(req.body.password, foundAccount.password)) {
            res.status(200).send({token: jwtHelper.signUserToken(foundAccount._id)});
        } else {
            res.status(401).send("Invalid password");
        }
    } catch(err) {
        next(err);
    }
});

export default router;