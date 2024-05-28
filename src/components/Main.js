import React from "react";
import '../static/css/Main.css'
import {Link} from "react-router-dom";

export default () => {
  return (
    <main>
      <div className='about-container'>
        <div className='left'>
          <h1>
            сервис по поиску<br/>
            публикаций<br/>
            о компании<br/>
            по его ИНН
          </h1>
          <p>
            Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
          </p>
          <Link to='/'>Запросить данные</Link>
        </div>
        {/*<img src='/img/main_1.png' alt='Service'/>*/}
      </div>
      <div className='why-us'>

      </div>

      <img className='img-why-us' src='/img/main-why-us.png' alt=''/>

      <div className='main-rates'>

      </div>

    </main>
  )
}
