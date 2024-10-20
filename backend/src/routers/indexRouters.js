import express from "express";
import routerUser from "./userRouters.js";
import routerProduct from "./productRouters.js";
const router = express.Router()

router.use('/', routerUser)
router.use('/', routerProduct)


export default router;