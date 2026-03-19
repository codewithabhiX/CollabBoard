import mongoose from "mongoose"

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true, 
    }
}, { timestamps: true })

export default mongoose.model("User", UserModel);
    