import React from "react";
import './index.css';
import {Link} from "react-router-dom";


const Navigation = ({callback}) => {

  const onClick = () => {
    if (callback) callback();
  }

  return (
    <nav>
      <Link
        to='/'
        onClick={onClick}
      >
        Главная
      </Link>
      <Link
        to='/'
        onClick={onClick}
      >
        Тарифы
      </Link>
      <Link
        to='/'
        onClick={onClick}
      >
        FAQ
      </Link>
    </nav>
  )
}

export default Navigation;
