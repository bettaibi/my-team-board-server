import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function getCookie(cname: string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie(cname: string): boolean {
    let token = getCookie(cname);
    if (token !== "") {
      return true;
    } else {
      return false;
    }
}

interface PrivateRouteProps{
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({path,  component: Component, ...rest}) => {
    const token = checkCookie("jwt");

    if (token) {
      return <Route path={path} component={Component} {...rest} />
    }
    else{
      return <Redirect to = "/login" />;
    }
};

export default PrivateRoute;