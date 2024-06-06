import React, {useEffect, useState} from "react";
import api from "../../../API/api";
import {logout} from "../../../store/userSlice";
import UserInfo from "./UserInfo";
import {useNavigate} from "react-router-dom";


const Auth = ({ login, dispatch, callback, isMobile }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (callback) callback();
    dispatch(logout());
    navigate('/');
  }

  return(
    <div className='auth-container'>
      <UserInfo
        isMobile={isMobile}
      />
      <div className='user'>
        <div className='login'>
          <span className='user-name'>{login}</span>
          <span
            className='logout'
            onClick={handleLogout}
          >
            Выйти
          </span>
        </div>
        <img src='/assets/img/auth-avatar.png' alt='avatar'/>
      </div>
    </div>
  )
}

export default Auth;
