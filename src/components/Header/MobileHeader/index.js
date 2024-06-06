import React, {useState} from "react";
import '../index.css';
import './index.css';
import Menu from "./Menu";


const MobileHeader = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return(
    <header>
      {isOpenMenu && <Menu setIsOpenMenu={setIsOpenMenu}/>}
      <img
        className='brand-logo'
        src='/assets/img/brand-logo/green-logo.png'
        alt='Skan logo'
      />
      <img
        className='menu-open'
        src='/assets/img/mobile/header/menu-open.png'
        alt='Open menu'
        onClick={() => setIsOpenMenu(true)}
      />
    </header>
  )
}

export default MobileHeader;