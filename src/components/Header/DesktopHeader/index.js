import React from "react";
import Auth from "../Auth";
import UnAuth from "../UnAuth";
import {useDispatch, useSelector} from "react-redux";
import '../index.css';
import Navigation from "../Navigation";


const DesktopHeader = () => {
  const userIsAuth = useSelector((state) => state.user.isAuthenticated);
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  return(
    <header>
      <img
        className='brand-logo'
        src='/assets/img/brand-logo/green-logo.png'
        alt='Skan logo'
      />
      <Navigation/>
      {userIsAuth
        ? <Auth login={login} dispatch={dispatch}/>
        : <UnAuth/>
      }
    </header>
  )
}

export default DesktopHeader;