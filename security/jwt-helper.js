import jwt from "jsonwebtoken";

const jwtHelper = {
    signUserToken: signUserToken,
    checkToken: checkToken
}

function signUserToken(id) {
    let token = jwt.sign({_id: id}, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256", expiresIn: "12h"});
    return token;
}

function checkToken(token) {
    let decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return decoded;
}

export default jwtHelper;