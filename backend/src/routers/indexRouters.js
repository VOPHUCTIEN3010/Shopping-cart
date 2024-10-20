import express from "express";
import routerUser from "./userRouters.js";
import routerProduct from "./productRouters.js";
import routerCategory from "./categoryRouters.js";
const router = express.Router()

router.use('/', routerUser)
router.use('/', routerProduct)
router.use('/categories', routerCategory)


export default router;