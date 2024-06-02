import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import '../static/css/Carousel.css';

const cards = [
  {
    id: 1,
    content: 'Высокая и оперативная скорость обработки заявки',
    img: '/img/icon-time.png'
  },
  {
    id: 2,
    content: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
    img: '/img/icon-search.png'
  },
  {
    id: 3,
    content: 'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству',
    img: '/img/icon-lock.png'
  },
];

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{...style, display: "block", background: "gray", right: '0', zIndex: 1}}
      style={{...style}}
      onClick={onClick}
    >
      <img src='/img/carusel-arrow.png' alt='Next' style={{opacity: '20%'}}/>
      {/*<i className="arrow right"/>*/}
    </div>
  )
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{...style, display: "block", color: "black", left: '0', zIndex: 1}}
      style={{...style}}
      onClick={onClick}
    >
      <img src='/img/carusel-arrow.png' alt='Next' style={{opacity: '20%', rotate: '180deg'}}/>
    </div>
  );
}

export default () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true,
    className: 'container',
    // arrows: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  };

  return (
    // <div className="carousel">
      <Slider {...settings}>
        {/*<img src="/img/carusel-arrow.png" alt="Next" className='next-arrow'/>*/}
        {cards.map(card => (
          <div className='card-container'>
            <div key={card.id} className="card">
              <img src={card.img} alt=''/>
              <p>{card.content}</p>
            </div>
          </div>
        ))}
      </Slider>
    // </div>
  );
}