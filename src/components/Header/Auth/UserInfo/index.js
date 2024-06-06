import React, {useEffect, useState} from "react";
import './index.css';
import Loader from "../../../Loader";
import api from "../../../../API/api";


const UserInfo = ({isMobile}) => {
  const [limit, setLimit] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAccountInfo().then(r => console.debug(r));
  }, []);

  const getAccountInfo = async () => {
    setLoading(true);
    await api.get('/account/info')
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
    return true;
  }

  return (
    <div
      className={isMobile ? 'display-none user-info' : 'user-info'}
    >
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
  )
}

export default UserInfo;