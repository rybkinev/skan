import React from "react";
import {Link} from "react-router-dom";


const UnAuth = ({callback}) => {
  const onClick = () => {
    if (callback) callback();
  }

  return (
    <div className='un-auth-container'>
      <Link
        to='/'
        className='button-register'
        onClick={onClick}
      >
        Зарегистрироваться
      </Link>
      <div className="divider"></div>
      <Link
        to='/login'
        className='button-login'
        onClick={onClick}
      >
        Войти
      </Link>
    </div>
  )
}

export default UnAuth;