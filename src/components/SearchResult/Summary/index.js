import React, {useEffect, useState} from "react";
import './index.css';
import Slider from "react-slick";
import Loader from "../../Loader";


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const combineDataByDate = (data) => {
    const combinedData = {};

    data.forEach(histogram => {
        histogram.data.forEach(item => {
            const dateKey = item.date.split('T')[0];
            if (!combinedData[dateKey]) {
                combinedData[dateKey] = {
                  period: formatDate(dateKey),
                  total: 0,
                  risks: 0,
                  originalDate: dateKey,
                };
            }
            if (histogram.histogramType === 'totalDocuments') {
                combinedData[dateKey].total += item.value;
            } else if (histogram.histogramType === 'riskFactors') {
                combinedData[dateKey].risks += item.value;
            }
        });
    });

    return Object.values(combinedData).sort((a, b) => new Date(a.originalDate) - new Date(b.originalDate));
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{...style, display: "block", background: "gray", right: '0', zIndex: 1}}
      style={{...style}}
    >
      <img
        onClick={onClick}
        src='/assets/img/carusel-arrow.png'
        alt='Next'
        // style={{opacity: '20%'}}
      />
    </div>
  )
}

function PrevArrow(props) {
  const { className, style, onClick, isMobile } = props;
  return (
    <div
      className={className}
      // style={{...style, display: "block", color: "black", left: '0', zIndex: 1}}
      style={{...style}}
    >
      <img
        onClick={onClick}
        src='/assets/img/carusel-arrow.png'
        alt='Next'
        style={{rotate: '180deg'}}
      />
      {!isMobile &&
        <div className="card-headers">
          <p className="header-period">Период</p>
          <p className="header-total">Всего</p>
          <p className="header-risks">Риски</p>
        </div>
      }
    </div>
  );
}

const Summary = ({searchData, isLoading, isError}) => {
  const [combinedData, setCombinedData] = useState([]);

  const maxWidth = 810;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //  useEffect(() => {
  //     if (tableWrapperRef.current) {
  //         tableWrapperRef.current.scrollLeft = 0;
  //     }
  // }, [combinedData]);
  useEffect(() => {
    if (searchData && !isError) {

      const combined = combineDataByDate(searchData.data);
      setCombinedData(combined);

      console.debug('Summary useEffect(searchData)', combined);

    }
  }, [searchData, isError]);

  const infinite = true ? !isLoading : false;
  const settings = {
    dots: false,
    infinite: infinite,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    adaptiveHeight: false,
    className: 'summary-container',
    slideWidth: '100px',
    // arrows: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow isMobile={isMobile}/>,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: infinite,
          dots: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: infinite,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: infinite,
          dots: false
        }
      }
    ]
  };

  return (
    <div className='summary-container'>
      {isMobile &&
        <div className="card-headers">
          <p className="header-period">Период</p>
          <p className="header-total">Всего</p>
          <p className="header-risks">Риски</p>
        </div>
      }
      <Slider {...settings}>
        {isLoading && <Loader/>}
        {!isLoading && combinedData.map((card, index) => (
          <div
            className='card-container'
            key={index}
          >
            <div className="card">
              <p>{card.period}</p>
              <p>{card.total}</p>
              <p>{card.risks}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Summary;