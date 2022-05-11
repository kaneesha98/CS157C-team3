const expressAsyncHandler = require('express-async-handler');
const Expense = require('../../model/Expense');
const ObjectID = require('bson').ObjectID;

//Set up database connection
const { MongoClient, ObjectId } = require('mongodb');
const URL = process.env.ATLAS_URI;
const client = new MongoClient(URL);
//const db = client.db("expense-tracker-project");
//const usersCollection = db.collection("users");
//const incomeCollection = db.collection("incomes");
//const expensesCollection = db.collection("expenses");

//create expense
const createAnExpense = expressAsyncHandler(async function (req, res) {
    const {title, amount, description, createdAt} = req.body;
    try {
        await client.connect();
        const db = client.db("expense-tracker-project");
        const expensesCollection = db.collection("expenses");
        const expenses = await expensesCollection.insertOne({
          type: "expense",
          title,
          amount,
          description,
          createdAt: new Date(createdAt),
          user: req.user?._id,
      });

      const query = { _id: expenses.insertedId};
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
      const expense = await expensesCollection.findOne(
          query, options)
      //console.log(expense);
      res.json(expense);  
    } catch (error) {
        res.json(error);
    }    
});

//fetch all expenses 
const fetchAllExpCtrl = expressAsyncHandler(async function (req, res) {
    const { page } = req?.query;
    try {
        //const userExp = await Expense.find({user: req.user?._id})
        //console.log(userExp);
      const expense = await Expense.paginate(
          {}, 
          { limit: 10, page: Number(page), populate: "user"});
      res.json(expense);  
    } catch (error) {
        res.json(error);
    }    
});

//fetch single expense 
const fetchExpDetailsCtrl = expressAsyncHandler(async function (req, res) {
    const { id } = req?.params;
    try {
      const expense = await Expense.findById(id);
      res.json(expense);  
    } catch (error) {
        res.json(error);
    }    
});

// update expense
const updateExpCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    const {title, amount, description} = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(id, {
            title,
            description,
            amount,
        }, 
        {
            new: true
        });
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
})

//delete single expense 
const deleteExpCtrl = expressAsyncHandler(async function (req, res) {

    const { id } = req?.params;
    console.log(id);
    try {
        await client.connect();
        const db = client.db("expense-tracker-project");
        const expensesCollection = db.collection("expenses");
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
        const expenses = await expensesCollection.findOneAndDelete(query, options);  
        //console.log(expenses.value);
        res.json(expenses.value);  
    } catch (error) {
        res.json(error);
    }    
});

//delete expense
const deleteAnExpense = expressAsyncHandler(async function (req, res) {
    const { id } = req?.params;
    console.log(id);
    try {
        await client.connect();
        const db = client.db("expense-tracker-project");
        const expensesCollection = db.collection("expenses");
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
        const expenses = await expensesCollection.findOneAndDelete({id}, options);  
        console.log(expenses.value);
        res.json(expenses.value);  
    } catch (error) {
        res.json(error);
    }    
});


module.exports = {fetchAllExpCtrl, fetchExpDetailsCtrl, updateExpCtrl, deleteExpCtrl,
                createAnExpense, deleteAnExpense};


