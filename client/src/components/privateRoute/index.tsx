import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps{
    path: string;
}

function getCookie(cname: string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie(): boolean {
    let token = getCookie("jwt");
    if (token !== "") {
      return true;
    } else {
      return false;
    }
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({path, children, ...rest}) => {
    const token = checkCookie();

    return (
        <Route path= {path} {...rest}>
            {
                token? {children} : <Redirect to ="/login" />
            }
        </Route>
    )
};

export default PrivateRoute;