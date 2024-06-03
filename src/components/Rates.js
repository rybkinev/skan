import React from "react";
import '../assets/styles/Retes.css';
import Rate from "./Rate";


const rates = [
  {
    id: 1,
    name: 'Beginer',
    description: 'Для небольшого исследования',
    img: '/assets/img/rate-beginer.png',
    className: 'beginer',
    url: '/',
    active: true,
    price: {
      actual: '799 ₽',
      before: '1 200 ₽'
    },
    price_description: 'или 150 ₽/мес. при рассрочке на 24 мес.',
    include: [
      'Безлимитная история запросов',
      'Безопасная сделка',
      'Поддержка 24/7'
    ]
  },
  {
    id: 2,
    name: 'Pro',
    description: 'Для HR и фрилансеров',
    img: '/assets/img/rate-pro.png',
    className: 'pro',
    url: '/',
    active: false,
    price: {
      actual: '1 299 ₽',
      before: '2 600 ₽'
    },
    price_description: 'или 279 ₽/мес. при рассрочке на 24 мес.',
    include: [
      'Все пункты тарифа Beginner',
      'Экспорт истории',
      'Рекомендации по приоритетам'
    ]
  },
  {
    id: 3,
    name: 'Business',
    description: 'Для корпоративных клиентов',
    img: '/assets/img/rate-business.png',
    className: 'business',
    url: '/',
    active: false,
    price: {
      actual: '2 379 ₽',
      before: '3 700 ₽'
    },
    price_description: '',
    include: [
      'Все пункты тарифа Pro',
      'Безлимитное количество запросов',
      'Приоритетная поддержка'
    ]
  }
]
export default () => {
  return (
    <div className='rates-container'>
      {rates.map(
        rate => <Rate rate={rate} key={rate.id}/>
      )}
    </div>
  )
}