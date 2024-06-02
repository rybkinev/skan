import React, {useEffect, useState} from "react";
import '../static/css/Header.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import api from "../API/api";
import {logout} from "../store/userSlice";
import Loader from "./Loader";

export default () => {
  const userIsAuth = useSelector((state) => state.user.isAuthenticated);
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  return (
    <header>
      <img src='/img/logo-head 1920x1920.png' alt='Skan logo'/>
      <nav>
        <Link to='/'>Главная</Link>
        <Link to='/'>Тарифы</Link>
        <Link to='/'>FAQ</Link>
      </nav>
      {userIsAuth
        ? <Auth login={login} dispatch={dispatch} />
        : <UnAuth/>
      }
    </header>
  )
}


const UnAuth = () => {
  return (
    <div className='un-auth-container'>
      <Link to='/'>Зарегистрироваться</Link>
      <div className="divider"></div>
      <Link to='/login' className='button-login'>Войти</Link>
    </div>
  )
}

const Auth = ({ login, dispatch }) => {

  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccountInfo();
  }, []);

  const getAccountInfo = async () => {
    setLoading(true);
      const response = await api.get('/account/info')
        .then(response => {
          console.debug('Header on load', 'account/info', response.data);
          setLimit(response.data.eventFiltersInfo.companyLimit);
          setCount(response.data.eventFiltersInfo.usedCompanyCount);
          setLoading(false);
        })
        .catch ((error) => {
          console.error('Header on load', 'account/info', error);
          setLoading(false);
        });
  }

  const handleLogout = () => {
    dispatch(logout());
  }

  return(
    <div className='auth-container'>
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
        <img src='/img/avatar.png' alt='avatar'/>
      </div>
      <div className='user-info'>
        {loading && <Loader/>}
        {!loading &&
          <>
            <div className='left'>
              <span>Использовано компаний</span>
              <span>Лимит по компаниям</span>
            </div>
            <div className='right'>
              <span>{count}</span>
              <span>{limit}</span>
            </div>
          </>
      }
      </div>
    </div>
  )
}