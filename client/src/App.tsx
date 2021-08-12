import React, {lazy, Suspense} from 'react';
import { 
  CssBaseline,
} from '@material-ui/core';
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import AppSkeleton from './components/AppSkeleton';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const Team = lazy(() => import('./pages/Team'));

function App() {

  return (
    <HashRouter basename="/">
      <CssBaseline />
      <Suspense fallback={<AppSkeleton />}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/team" />
          </Route>

          <PrivateRoute path="/team" component={Team} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

export default App;
