import { Schema, model } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required : true,
    },
    email: String,
    password: String,
    contact: String,
    role: String
})

const userModel = model("USER", userSchema)

export default userModel;