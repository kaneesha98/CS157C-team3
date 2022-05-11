const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//schema
const userSchema = mongoose.Schema({
    firstname:{
        required: [true, 'First name is required'],
        type: String,
    },
    lastname:{
        required: [true, 'Last name is required'],
        type: String,
    },
    email:{
        required: [true, 'Email is required'],
        type: String,
    },
    password:{
        required: [true, 'Password is required'],
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    dateJoined:{ 
        type: Date, 
        required: false, 
        default: Date.now 
    },
},{
    toObject: {
        virtuals: true,
      },
      toJSON: {
        virtuals: true,
      },
    timestamp:true,
});

//virtual - reference to expense collection by user or add all expenses to each user
userSchema.virtual("expenses", {
    ref: "Expense",
    foreignField: "user",
    localField: "_id",
  });

//virtual - reference to income collection by user or or add all income to each user
userSchema.virtual("income", {
ref: "Income",
foreignField: "user",
localField: "_id",
});

//hash password, .pre running before userSchema is saved 
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//verify password 
//recieve password from front-end and compare with hashed password in the DB
userSchema.methods.isPasswordMatch = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//compile Schema into model
const User = mongoose.model('User',userSchema);

module.exports = User;