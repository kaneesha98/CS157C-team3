const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../../middlewares/generateToken');
const User = require("../../model/User");
//Register 

const registerUser = expressAsyncHandler(async (req, res) => {
    const {email,firstname,lastname, password} = req?.body;
     //check if user exists
    const userExists = await User.findOne({ email});
    if(userExists) throw new Error("User already exists");
    
    try {
            const user = await User.create({email,firstname, lastname, password});
            res.status(200).json(user);
        } catch (error) {
            res.json(error);
        }
});


//fetch all users

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.find({});
        res.json(user);
    } catch (error) {
        res.json(error);
        
    }
});

//login users
const loginUsersCtrl = expressAsyncHandler(async(req, res) => {
    const {email,password} = req?.body;
    //find the user in db

    const userFound = await User.findOne({email});
    //check if the user password matches
    if(userFound && (await userFound?.isPasswordMatch(password))){
        res.json({
            _id:userFound?._id,
            firstname:userFound?.firstname,
            lastname:userFound?.lastname,
            email:userFound?.email,
            isAdmin:userFound?.isAdmin,
            token: generateToken(userFound?._id)
        });

    }
    else{
        res.status(401);
        throw new Error('Invalid Login');
    }
});

module.exports = {registerUser, fetchUsersCtrl, loginUsersCtrl};