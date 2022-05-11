const expressAsyncHandler = require('express-async-handler');
const User = require('../../model/User');
const generateToken = require('../../middlewares/generateToken');
const { collection } = require('../../model/User');


//Register
const registerUser = expressAsyncHandler(async (req, res) => {
    //Parse the body of the request in Json format
    const {email,firstname,lastname, password} = req?.body;

     //check if user exist
    const userExists = await User.findOne({ email});
    if(userExists) throw new Error('User already exists');
    try {
          const user = await User.create({email,firstname, lastname, password});
          res.status(200).json({
            _id:user?._id,
            firstname:user?.firstname,
            lastname:user?.lastname,
            email:user?.email,
            isAdmin:user?.isAdmin,
            token: generateToken(user?._id)
          });;
        } catch (error) {
            res.json(error);
        }

});

//fetch all users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
    try {
        //retrive all the instances of users
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

//user profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const profile = await User.findById(req?.user?._id).populate("expenses").populate("income");
  
      res.json(profile);
    } catch (error) {
      res.json(error);
    }
  });

  //user profile
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const profile = await User.findByIdAndUpdate(
        req?.user?._id,
        {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(profile);
    } catch (error) {
      res.json(error);
    }
  });



module.exports = {registerUser, fetchUsersCtrl, loginUsersCtrl, userProfileCtrl, updateUserCtrl};