const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//schema
const incomeSchema = mongoose.Schema({
    title:{
        required: [true, 'Title is required'],
        type: String,
    },
    description:{
        required: [true, 'Description is required'],
        type: String,
    },
    type:{
        type: String,
        default: 'income',
    },
    amount:{
        required: [true, 'Amount is required'],
        type: Number,
    },
    createdAt:{ 
        type: Date, 
        required: false, 
        default: Date.now 
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, //must be mongodb id
        ref:'User', //reference to User model 
        required: [true, 'User ID is required'],
    }
},
//Specify configuration or properties for models 
//- to populate user into queries object
{
    timestamp:true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

// pagination to add more functionalities into the model
incomeSchema.plugin(mongoosePaginate);

//Compile
const Income = mongoose.model("Income",incomeSchema);


module.exports = Income;
