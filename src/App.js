import ProductDetails from './components/ProductDetails/ProductDetails'
import { useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/authentication/Login/login';
import Register from './components/authentication/register/register';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import SaveProduct from './components/SaveProduct/SaveProduct';
import { UserContext } from './context/context';

function App() {
  const [user, setuser] = useContext(UserContext).user;

  return (
    
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/Register' >
          <Register />
        </Route>
        <Route path='/submitProduct'>
          <SaveProduct />
        </Route>
        <Route path="/product-details/:id" component={ProductDetails} />
        {user ? (<>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/cart'>
            <Cart />
          </Route>
        </>) : (<Redirect to='/' />)}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
