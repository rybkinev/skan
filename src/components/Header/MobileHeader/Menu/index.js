import React from "react";
import './index.css';
import Navigation from "../../Navigation";
import UnAuth from "../../UnAuth";
import Auth from "../../Auth";
import {useDispatch, useSelector} from "react-redux";


const Menu = ({setIsOpenMenu}) => {
  const userIsAuth = useSelector((state) => state.user.isAuthenticated);
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const closeMenu = () => setIsOpenMenu(false);
  return(
    <div className='main-menu'>
      <div className='menu-header'>
        <img
          className='brand-logo'
          src='/assets/img/brand-logo/white-logo.png'
          alt='Skan logo'
        />
        <img
          className='menu-close'
          src='/assets/img/mobile/header/menu-close.png'
          alt='Open menu'
          onClick={closeMenu}
        />
      </div>
      <Navigation callback={closeMenu}/>
      {userIsAuth
        ? <Auth
            login={login}
            dispatch={dispatch}
            callback={closeMenu}
            isMobile={true}
          />
        : <UnAuth callback={closeMenu}/>
      }
    </div>
  )
}

export default Menu;