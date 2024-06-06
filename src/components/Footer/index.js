import React from "react";
import './index.css'

export default () => {
  return (
    <footer>
      <img
        src='/assets/img/brand-logo/white-logo.png'
        alt='Skan logo'
      />
      <div className='contact-container'>
        <address>
          <p className='contact-item'>
            г. Москва, Цветной б-р, 40<br/>
          </p>
          <p className='contact-item'>
            <a href='tel:+7 495 771 21 11'>+7 495 771 21 11</a>
          </p>
          <p className='contact-item'>
            <a href='mailto:info@skan.ru'>info@skan.ru</a>
          </p>
          <p className='copyright'>
            Copyright. 2022
          </p>
        </address>
      </div>
    </footer>
  )
}