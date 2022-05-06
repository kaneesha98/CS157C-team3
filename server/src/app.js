const express = require('express');
const dbConnect = require('./config/dbConnect');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const userRoute = require('./routes/users/usersRoute');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/expenses/expenseRoutes');

const app = express();

//env 
dotenv.config();

// dbConnect
dbConnect();

//middlewares
app.use(express.json());
//or app.use(cors({ credentials: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to expense tracker API'});
});

// user routes
app.use("/api/users", userRoute);

// income route
app.use("/api/income", incomeRoute);

// expense route
app.use("/api/expenses", expenseRoute);

// error 
app.use(notFound);
app.use(errorHandler);

module.exports = app;
