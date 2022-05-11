const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");
const Income = require("../../model/Income");

//Query for objects and group up their fields
const accountStatsCtrl = expressAsyncHandler(async (req, res) => {
    try {
      //Expenses statistics using agregation pipeline
      const expenseStats = await Expense.aggregate([
        //filter: record has amount different than 0 
        { $match: { amount: { $gte: 0 } } },
        {
          //Mongoose query pipeline to group all records with a specified field
          $group: {
            _id: null,
            //Calculate with built-in function
            averageExp: { $avg: "$amount" },
            totalExp: { $sum: "$amount" },
            minExp: { $min: "$amount" },
            maxExp: { $max: "$amount" },
            //Sum all matching records
            totalRecordsExp: { $sum: 1 },
          },
        },
      ]);
    
    //Income statistics
    const incomeStats = await Income.aggregate([
        //filter
        { $match: { amount: { $gte: 0 } } },
        {
          $group: {
            _id: null,
            averageIncome: { $avg: "$amount" },
            totalIncome: { $sum: "$amount" },
            minIncome: { $min: "$amount" },
            maxIncome: { $max: "$amount" },
            totalRecordsIncome: { $sum: 1 },
          },
        },
      ]);
  
      res.json({ expenseStats, incomeStats });
    } catch (error) {
      res.json(error);
    }
  });
  
module.exports = accountStatsCtrl;

  