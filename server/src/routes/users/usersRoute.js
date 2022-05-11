const express = require('express');

const {
    registerUser, 
    fetchUsersCtrl,
    loginUsersCtrl,
    userProfileCtrl,
    updateUserCtrl,
} = require("../../controllers/users/usersCtrl");
const userRoute = express.Router();
const authMiddleware = require("../../middlewares/authMiddleware");

//specific routes after base route
userRoute.post('/register', registerUser);
userRoute.get("/profile", authMiddleware, userProfileCtrl);
userRoute.put("/update",  authMiddleware, updateUserCtrl);
userRoute.post('/login', loginUsersCtrl);
userRoute.get('/', authMiddleware,fetchUsersCtrl)

module.exports = userRoute;