const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require('../model/User');

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    let token;

    //Check request header, use authorization property start with 'bearer'
    //take token at 2nd index (Bearer is 1st at index)
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        token = req?.headers?.authorization?.split(' ')[1];
        //console.log(token);
        try {
            if(token) {
                //token verification
                const decodedUser = jwt.verify(token, process.env.JWT_KEY);

                // find the user
                const user = await User.findById(decodedUser?.id);
               // console.log(user);

                // attach the user to request obj
                req.user = user;
                
                //move to next error handler
                next();
            }
        } catch (error) {
            throw new Error("Not Authorized. Token expired.");
        }
    } else {
        throw new Error("There is no token attached to the header.");
    }
});

module.exports = authMiddleware;