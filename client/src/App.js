import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navigation/Navbar';
import ProtectedRoute from './components/Navigation/ProtectedRoute';
import NotAdmin from './components/NotAdmin';
import AddExpense from './pages/expense/AddExpense';
import Home from './pages/Home';
import AddIncome from './pages/income/AddIncome';
import DashboardData from './pages/users/DashboardData';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import AdminRoute from './components/Navigation/AdminRoute';
import ExpensesList from './pages/expense/ExpensesList';
import IncomeList from './pages/income/IncomeList';
import EditContent from './components/EditContent';
import Profile from './pages/users/Profile';
import UserProfileExpList from './pages/users/UserProfileExpList';
import UserProfileIncList from './pages/users/UserProfileIncList';
import UpdateProfile from './pages/users/UpdateProfile';
import DeleteContent from './components/DeleteContent';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>

      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/not-found" element={<NotAdmin />}></Route>
      <Route exact path="/dashboard" element={<AdminRoute Component={DashboardData} />} />
      <Route exact path="/profile" element={<ProtectedRoute Component={Profile} />} />

      <Route exact path="/edit" element={<ProtectedRoute Component={EditContent} />} />
      <Route exact path="/delete" element={<ProtectedRoute Component={DeleteContent} />} />

      <Route exact path="/expenses" element={<ProtectedRoute Component={ExpensesList} />} />
      <Route path="/add-expense" element={<ProtectedRoute Component={AddExpense} />} />

      <Route exact path="/income" element={<ProtectedRoute Component={IncomeList} />} />
      <Route exact path="/add-income" element={<ProtectedRoute Component={AddIncome} />} />

      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/register" element={<Register />}></Route>
      <Route exact path="/user-expenses" element={<ProtectedRoute Component={UserProfileExpList} />} />
      <Route exact path="/user-income" element={<ProtectedRoute Component={UserProfileIncList} />} />
      <Route exact path="/update-profile" element={<ProtectedRoute Component={UpdateProfile} />} />

    </Routes>
  </BrowserRouter>

  );
}

export default App;
