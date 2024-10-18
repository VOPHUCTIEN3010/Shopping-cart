import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true,  select: false },
    phone: { type: String, unique: true },
    image: { type: String },
    sex: { type: String, required: true},
    birthday: { type: String,  required: true}
}, {
    timestamps: true,
});


const User = mongoose.model("User", userSchema);

export default User;