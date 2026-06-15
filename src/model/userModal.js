
import { UserRole } from "@/helper/enums";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    role:{
        type : String,
        enum: Object.values(UserRole),
        default : UserRole.USER
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpire: Date,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
});

const User =
    mongoose.models.users ||
    mongoose.model("users", UserSchema);

export default User;
