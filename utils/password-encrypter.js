import bcrypt from "bcryptjs";

const passwordHelper = {
    hashPassword: hashPassword,
    checkPassword: checkPassword
}

async function hashPassword(password) {
    let hashed = await bcrypt.hash(password, 9);
    return hashed;
}

async function checkPassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

export default passwordHelper;