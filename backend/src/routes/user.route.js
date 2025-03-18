import express from "express";
import{userController} from "../controllers/user.controller.js"
const userRouter = express.Router();

userRouter.route("/create").post(userController.createuser)
userRouter.route("/get").get(userController.getuser)
userRouter.route("/getbyid/:id").get(userController.getuserbyid)
userRouter.route("/login").post(userController.login)

export { userRouter };
