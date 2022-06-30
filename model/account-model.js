import mongoose from "mongoose";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        require: [true, "username is missing"],
        trim: true
    },
    password: {
        type: String,
        require: [true, "password is missing"]
    }
});

const Account = mongoose.model("Account", accountSchema);

export default Account;