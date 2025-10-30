import e from "express";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    auth0Id: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    addess: {
        type: String,
    },
    city: {
        type: String
    },
    country: {
        type: String
    }
});

const User = mongoose.model("User", UserSchema);
export default User;