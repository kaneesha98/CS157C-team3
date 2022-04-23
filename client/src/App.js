import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter,
  Route, // MAKE SURE TO HAVE react-router-dom VERSION 5 TO USE 'SWITCH'
  Switch // IF VERSION 6 IS INSTALLED, WE MUST CHANGE 'SWITCH' TO 'ROUTES'
} from 'react-router-dom';
import Login from './pages/users/Login';
import Register from './pages/users/Register';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
