import React, {lazy, Suspense} from 'react';
import { 
  CssBaseline,
} from '@material-ui/core';
import {HashRouter, Route, Switch, Link} from 'react-router-dom';
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

function App() {

  return (
    <HashRouter basename="/">
      <CssBaseline />
      <Suspense fallback={<span>Loading...</span>}>
        <Switch>
          <Route path="/" exact> 
           <Link to="/login">Login page</Link>
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

export default App;
