// importing required modules
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";

// creating user schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// user schema method to compare password with hashed password in database for every user
UserSchema.methods.comparedPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

// creating user model
const User = mongoose.model('User', UserSchema);

// exporting default user
export default User;