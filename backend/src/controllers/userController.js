import UserService from "../services/userService.js";
import { USERS_MESSAGES } from "../utils/message.js";

export const loginController = async (req, res) => {
    try {
        const user = req.body;
        const result = await UserService.login(user);        
        if (!result) {
            return res.status(401).json({
                message: USERS_MESSAGES.INVALID_CREDENTIALS,
            });
        }
        // console.log('check: ' + result);
        
        return res.status(200).json({
            message: USERS_MESSAGES.LOGIN_SUCCESS,
            data: {result },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const registerController = async (req, res) => {
    try {
        const user = req.body;
        const result = await UserService.register(user);
        return res.status(200).json({
            message: USERS_MESSAGES.REGISTER_SUCCESS,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// export const logoutController = async (req, res) => {
//     const refresh_token = req.params.refresh_token
//     const result = await UserService.logout(refresh_token)
// }

export const refreshTokenController = async (req, res) => {
    try {
        const user = req.user;
        const result = await UserService.login(user);
        return res.status(200).json({
            message: USERS_MESSAGES.TOKEN_REFRESHED,
            data: { result },
        });
    } catch (error) {
        return res.status(401).json({
            message: USERS_MESSAGES.INVALID_CREDENTIALS,
        });
    }
}

