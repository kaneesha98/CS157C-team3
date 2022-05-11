const express = require('express');
const {
    fetchAllExpCtrl, 
    fetchExpDetailsCtrl, 
    updateExpCtrl, 
    deleteExpCtrl,
    createAnExpense,
    deleteAnExpense
} = require('../../controllers/expenses/expenseCtrl')
const authMiddleware = require('../../middlewares/authMiddleware');

const expenseRoute = express.Router();

expenseRoute.post("/", authMiddleware,createAnExpense);
expenseRoute.get("/", authMiddleware, fetchAllExpCtrl);
expenseRoute.get("/:id", authMiddleware, fetchExpDetailsCtrl);
expenseRoute.put("/:id", authMiddleware,updateExpCtrl);
expenseRoute.delete("/:id", authMiddleware, deleteExpCtrl);
expenseRoute.post("/create", authMiddleware,createAnExpense);
expenseRoute.post("/delete", authMiddleware,deleteAnExpense);

module.exports = expenseRoute;