import { getAllUsers, getUserById, loginUser, registerUser } from "./user.js";

const userController = {
  createuser:registerUser,
  getuser:getAllUsers,
  getuserbyid:getUserById,
  login:loginUser

};

export { userController };
