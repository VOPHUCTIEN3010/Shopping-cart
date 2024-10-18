import {config} from "dotenv";
import { USERS_MESSAGES } from "../utils/message.js";
import {hashPassword} from "../utils/crypto.js";
import { databaseService } from "./databaseServices.js";
import User from "../models/userModel.js";
import jwt from  'jsonwebtoken';
config()

const  UserService = { 
    register: async (user) => { 
        const hashedPassword = hashPassword(user.password);
        const newUser = new User({...user, password: hashedPassword});
        await databaseService.users.insertOne(newUser);
        const cloneNewUser = Object.assign({}, newUser.toObject());
        delete cloneNewUser.password;
        const [access_token, refresh_token] = await Promise.all([createAccessToken(user), createRefreshToken(user)]);
        return { access_token, refresh_token, user: cloneNewUser };
    },  
    
    login: async (user) => {
        const existingUser = await databaseService.users.findOne({ email: user.email});        
        if (!existingUser) {
            throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT);
        }
        delete existingUser.password;
        const [access_token, refresh_token] = await Promise.all([createAccessToken(existingUser), createRefreshToken(existingUser)]);
        return {access_token, refresh_token, user: existingUser};
    }
}

const createAccessToken =  (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    
}
const createRefreshToken =  (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}


export default UserService;

