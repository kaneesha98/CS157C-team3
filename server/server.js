//Initialize express app
const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5002;
app.use(cors());
app.use(express.json());
// get driver connection
const dbo = require("./db/conn");
const userRoute = require("./src/routes/users/usersRoute");
const incomeRoute = require("./src/routes/income/incomeRoutes");
const expenseRoute = require("./src/routes/expenses/expenseRoutes");
const { notFound, errorHandler } = require("./src/middlewares/errorMiddleware");
const accountStatsRoute = require("./src/routes/accountStatsRoute/accountStatsRoute");

//Connect to the database
dbo();

//routes
//base route for users API
app.use("/api/users", userRoute);

//income routes
app.use("/api/income", incomeRoute);

//expense routes
app.use("/api/expenses", expenseRoute);

//account statistics routes
app.use("/api", accountStatsRoute)

//Error
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});
