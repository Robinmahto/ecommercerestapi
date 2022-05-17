import express from "express";
import { registerController, loginController, userInfoController } from "../controllers";
import userInfoAuth from "../middlewares/userInfoAuth";

const router = express.Router();

router.post('/register', registerController.register)
router.post('/login', loginController.login)

// protected Routes
router.get('/me', userInfoAuth, userInfoController.me);


export default router;