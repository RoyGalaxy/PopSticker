import mongoose from "mongoose";

// TODO: create orders column

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    cartData: {
        type: Object,
        required: true,
        default: {},
    }

})

const UserModel = mongoose.model("user", UserSchema)

export default UserModel