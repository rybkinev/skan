import React from "react";
import '../static/css/Header.css'
import {Link} from "react-router-dom";

export default () => {
  return (
    <header>
      <img src='/img/logo-head 1920x1920.png' alt='Skan logo'/>
      <nav>
        <Link to='/'>Главная</Link>
        <Link to='/'>Тарифы</Link>
        <Link to='/'>FAQ</Link>
      </nav>
      <div className='auth-container'>
        <Link to='/'>Зарегистрироваться</Link>
        <div className="divider"></div>
        <Link to='/' className='button-login'>Войти</Link>
      </div>
    </header>
  )
}