import express from "express";
import {loginValidator, registerValidator }  from "../middlewares/userMiddlewares.js";
import auth from "../middlewares/auth.js";
import {
  loginController,
  registerController,
  logoutController,
  getUserController,
  updateUserController
} from "../controllers/userController.js";

const routerUser = express.Router()

routerUser.post('/register', registerValidator, registerController )
routerUser.post('/login', loginValidator, loginController )
routerUser.post('/logout', logoutController)
routerUser.get('/me', auth, getUserController).put('/updateMe', auth , updateUserController)

// router.post('/update/user')
export default routerUser;