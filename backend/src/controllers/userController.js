import UserService from "../services/userService.js";
import { USERS_MESSAGES } from "../utils/message.js";
import authMe from "../middlewares/authMe.js";

export const loginController = async (req, res) => {
    try {
        const user = req.body;
        const data = await UserService.login(user);
        if (!data) {
            return res.status(401).json({
                message: USERS_MESSAGES.INVALID_CREDENTIALS,
            });
        }

        return res.status(200).json({
            message: USERS_MESSAGES.LOGIN_SUCCESS,
            data,
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

export const logoutController = async (req, res) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({
                success: false,
                message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRE,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during logout",
        });
    }
};

export const getUserController = async (req, res) => {
    try {
        const userID = authMe(req);

        if (!userID) {
            return res.status(401).json({
                message: USERS_MESSAGES.UNAUTHORIZED,
            });
        }
        const user = await UserService.getUser(userID);
        return res.status(200).json({
            message: USERS_MESSAGES.GET_USERS_SUCCESS,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateUserController = async (req, res) => {
    try {
        const userID = authMe(req);
        if (!userID) {
            return res.status(401).json({
                message: USERS_MESSAGES.UNAUTHORIZED,
            });
        }
        const user = req.body;
        const updatedUser = await UserService.updateUserById(userID, user);
        return res.status(200).json({
            message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
