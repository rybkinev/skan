import React from "react";
import './index.css';
import {Link} from "react-router-dom";

export default (props) => {
  const rate = props.rate
  return (
    <article
      className={`rate-container ${rate.active ? `active ${rate.className}` : ''}`}
      // className='rate-container'
    >
      <div className={`rate-header ${rate.className}`}>
        <span className='rate-name'>
          {rate.name}
        </span>
        <p className='rate-description'>
          {rate.description}
        </p>
        <img src={rate.img}/>
      </div>
      <div className='rate-main'>
        <div className='rate-price'>
          <span className='price'>
            {rate.price.actual}
          </span>
          <span className='price-before'>
            {rate.price.before}
          </span>
        </div>
        <span className='rate-price-description'>
          {rate.price_description}
        </span>
        <div className='rate-include'>
          <span>
            В тариф входит:
          </span>
          <ul>
            {rate.include.map((text, i) => <li key={i}>{text}</li>)}
          </ul>
        </div>
        {
          rate.active ?
            <>
              <Link className='active' to='/'>Перейти в личный кабинет</Link>
              <div className='stick-active'>Текущий тариф</div>
            </>
          :
            <Link to={rate.url}>Подробнее</Link>
        }
      </div>
    </article>
  )
}