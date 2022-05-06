import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import AddIncome from './pages/income/AddIncome';
import AddExpense from './pages/expense/AddExpense';
import Profile from './pages/users/Profile';
import ProtectedRoute from './components/Navigation/ProtectedRoute';
import Navbar from "./components/Navigation/Navbar";
import NotAdmin from './components/NotAdmin';
import DashboardData from './pages/users/DashboardData';
import AdminRoute from './components/Navigation/AdminRoute';
import ExpensesList from './pages/expense/ExpensesList';
import EditExpense from './pages/expense/EditExpense';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <ProtectedRoute exact path="/expenses" component={ExpensesList}/>
        <ProtectedRoute exact path="/edit-expense" component={EditExpense} />
        <AdminRoute exact path="/Dashboard" component={DashboardData}/>
        <Route exact path="/not-found" component={NotAdmin}/>        
        <ProtectedRoute exact path="/profile" component={Profile}/>
        <ProtectedRoute exact path="/add-expense" component={AddExpense}/>
        <ProtectedRoute exact path="/add-income" component={AddIncome}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
