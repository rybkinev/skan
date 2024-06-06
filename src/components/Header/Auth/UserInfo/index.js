import React from "react";
import './index.css';
import Loader from "../../../Loader";


const UserInfo = ({loading, count, limit, isMobile}) => {
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