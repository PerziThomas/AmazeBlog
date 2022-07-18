import Account from "../model/account-model.js";
import jwtHelper from "./jwt-helper.js";
import express from "express";
import buildErrorObject from "../error/error-object.js";
import Errors from "../error/errors.js";

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {*} next 
 * @returns 
 */
async function checkUserByJWT(req, res, next) {
    if(req.url.endsWith("/api/accounts/login")) { // Skip if login
        next();
        return;
    }

    let token = req.headers.authorization.split(" ")[1];
    let user;

    try {
        let decoded = jwtHelper.checkToken(token);
        user = await Account.findById(decoded._id);
    } catch(err) {
        let error = buildErrorObject(Errors.BAD_REQUEST, err.message);
        next(error);
        return;
    }

    if(!user) {
        throw buildErrorObject(Errors.UNAUTHORIZED, "User not found, no permission");
    } else {
        next();
    } 
}

export default checkUserByJWT;