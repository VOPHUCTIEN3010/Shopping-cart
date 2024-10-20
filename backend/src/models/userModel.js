import mongoose from "mongoose";
import { Role } from "../constants/role.js";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    phone: { type: String, unique: true, default: ""},
    image: { type: String,  },
    role: { type: String, required: true, default: Role.USER },
    sex: { type: String, required: true, default: ""},
    birthday: { type: String,  required: true, default: ""}
}, {
    timestamps: true,
});


const User = mongoose.model("User", userSchema);

export default User;