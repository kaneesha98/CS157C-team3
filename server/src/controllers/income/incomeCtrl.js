const expressAsyncHandler = require('express-async-handler');
const Income = require("../../model/Income");
//Set up database connection
const { MongoClient, ObjectId } = require('mongodb');
const URL = process.env.ATLAS_URI;
const client = new MongoClient(URL);
const ObjectID = require('bson').ObjectID;


//create an income
const createIncCtrl = expressAsyncHandler(async function (req, res) {
    const {title, amount, description, createdAt} = req.body;
    try {
        await client.connect();
        const db = client.db("expense-tracker-project");
        const incomeCollection = db.collection("incomes");
        const incomes = await incomeCollection.insertOne({
          type: "income",
          title,
          amount,
          description,
          createdAt: new Date(createdAt),
          user: req.user?._id,
      });

      const query = { _id: incomes.insertedId};
      const options = {
          projection: {
              _id: 1,
            type: 1,
            title: 1,
            amount: 1,
            description: 1,
            createdAt: 1,
            user: 1,
          }
      }
      const income = await incomeCollection.findOne(
          query, options)
      //console.log(income);
      res.json(income);   
    } catch (error) {
        res.json(error);
    }    
});



//fetch all income 
const fetchAllIncCtrl = expressAsyncHandler(async function (req, res) {
    //console.log(req?.user);
    const { page } = req?.query;   
    try {
      const income = await Income.paginate(
          {}, 
          { limit : 10, page: Number(page), populate: "user"});
      res.json(income);  
    } catch (error) {
        res.json(error);
    }    
});

//fetch single income 
const fetchIncDetailsCtrl = expressAsyncHandler(async function (req, res) {
    const { id } = req?.params;
    try {
      const income = await Income.findById(id);
      res.json(income);  
    } catch (error) {
        res.json(error);
    }    
});

//Update an income by income_id
const updateIncCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    const {title, amount, description} = req.body;
    try {
        const income = await Income.findByIdAndUpdate(id, {
            title,
            description,
            amount,
        }, 
        {
            new: true
        });
        res.json(income);
    } catch (error) {
        res.json(error);
    }
})

//delete single income 
const deleteIncCtrl = expressAsyncHandler(async function (req, res) {
    const { id } = req?.params;
    //console.log(id);
    try {
        await client.connect();
        const db = client.db("expense-tracker-project");
        const incomeCollection = db.collection("incomes");
        const query = {_id: new ObjectID(id)};
        const options = {
            projection: {
                _id: 1,
                type: 1,
                title: 1,
                amount: 1,
                description: 1,
                createdAt: 1,
                user: 1,
            }
        }
        const income = await incomeCollection.findOneAndDelete(query, options);  
        //console.log(income.value);
        res.json(income.value);   
    } catch (error) {
        res.json(error);
    }    
});

module.exports = {
    createIncCtrl, 
    fetchAllIncCtrl, 
    fetchIncDetailsCtrl, 
    updateIncCtrl,
    deleteIncCtrl
};


