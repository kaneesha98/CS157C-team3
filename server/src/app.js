const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect');
const { registerUser } = require('./controllers/users/usersCtrl');
const { errorHandler,notFound } = require('./middlewares/errorMiddleware');
const userRoute = require('./routes/users/usersRoute');
const incomeRoute = require('./routes/income/incomeRoutes');
const expenseRoute = require('./routes/expenses/expenseRoutes');

const app = express();

//env

dotenv.config();


//dbConnect
dbConnect();


//middleware

app.use(express.json());

app.get('/',(req, res) => {
    res.json({msg: 'Welcome to expenses tracker'})
})

//users routes

app.use('/api/users',userRoute);

//income routes
app.use("/api/income", incomeRoute);

//expense route
app.use("api/expenses", expenseRoute);

//error
app.use(notFound);
app.use(errorHandler);


module.exports = app;

