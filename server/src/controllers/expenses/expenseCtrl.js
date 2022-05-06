const expressAsyncHandler = require('express-async-handler');
const Expense = require("../../model/Expense");

//create expense
const createExpCtrl = expressAsyncHandler(async function (req, res) {
    const {title, amount, description} = req.body;
    try {
      const expense = await Expense.create({
          title,
          amount,
          description,
          user: req.user?._id,
      });
      res.json(expense);  
    } catch (error) {
        res.json(error);
    }    
});

// Fetch all expense
const fetchAllExpCtrl = expressAsyncHandler(async (req, res) => {
    const { page } = req?.query;
    try {
        const expense = await Expense.paginate({}, 
            {limit: 10, page: Number(page), populate: "user"});
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

// Fetch single expense
const fetchExpDetailsCtrl = expressAsyncHandler(async (req, res) => {
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
    const {title, amount, description } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(
            id, 
            {
                title, 
                description, 
                amount
            }, 
            { new: true }
        );
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

// Delete single expense
const deleteExpCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const expense = await Expense.findByIdAndDelete(id);
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

module.exports = {
    createExpCtrl,
    fetchAllExpCtrl,
    fetchExpDetailsCtrl,
    updateExpCtrl,
    deleteExpCtrl,
};