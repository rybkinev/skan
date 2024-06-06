import React, {useEffect, useState} from "react";
import api from "../../../API/api";
import {logout} from "../../../store/userSlice";
import UserInfo from "./UserInfo";


const Auth = ({ login, dispatch, callback, isMobile }) => {

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
          // console.debug('Header on load', 'account/info', response.data);
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
    callback();
    dispatch(logout());
  }

  return(
    <div className='auth-container'>
      <UserInfo
        loading={loading}
        count={count}
        limit={limit}
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
