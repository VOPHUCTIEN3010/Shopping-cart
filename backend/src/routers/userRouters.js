import express from "express";
import {loginValidator, registerValidator }  from "../middlewares/userMiddlewares.js"
import {
  loginController,
  registerController,
  // logoutController
} from "../controllers/userController.js";

const router = express.Router()

router.post('/register', registerValidator, registerController )
router.post('/login', loginValidator, loginController )
// router.post('logout', logoutController)

export default router;