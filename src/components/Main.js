import React from "react";
import '../static/css/Main.css'
import {Link} from "react-router-dom";
import Carousel from "./Carousel";
import Rates from "./Rates";
import store from "../store/store";

export default () => {
  const state = store.getState();
  const userIsAuth = state.user.isAuthenticated;

  return (
    <main className='welcome'>
      <section className='about-container'>
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
          {userIsAuth
            ? <Link to='/'>Запросить данные</Link>
            : <></>
          }
        </div>
        <img src='/img/main_1.png' alt='Service'/>
      </section>
      <section className='why-us'>
        <h2>почему именно мы</h2>
        <Carousel/>
        <img className='img-why-us' src='/img/main-why-us.png' alt=''/>
      </section>

      <section className='main-rates'>
        <h2>наши тарифы</h2>
        <Rates/>
      </section>

    </main>
  )
}
