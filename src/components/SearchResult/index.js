import React, {useEffect, useState} from "react";
import './index.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import api from "../../API/api";
import Summary from "./Summary";
import Documents from "./Documents";


const SearchResult = () => {
  const location = useLocation();
  const userIsAuth = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [totalDataCount, setTotalDataCount] = useState(0);

  useEffect(() => {
    if (!userIsAuth) {
      navigate('/login');
    }
  }, [userIsAuth, navigate]);

  const fetchData = async () => {
    const searchParams = location.state?.searchParams;
    if (!searchParams) {
      console.error('Нет параметров для поиска');
      setIsLoading(false);
      navigate('/search');
      return;
    }

    setIsLoading(true);
    setIsError(false);

    await api.post(
      '/objectsearch/histograms',
      JSON.stringify(searchParams)
    ).then(response => {
      const histogramData = response.data;
      setSearchData(histogramData);

      const totalDocuments = histogramData.data.find(histogram => histogram.histogramType === 'totalDocuments');
      if (totalDocuments) {
        const total = totalDocuments.data.reduce((acc, item) => acc + item.value, 0);
        setTotalDataCount(total);
      }

      console.debug('Response /objectsearch/histograms', 'Количество данных', histogramData.length);
      console.debug('Response /objectsearch/histograms', histogramData);

    }).catch(error => {
      console.error('Error /objectsearch/histograms', error);
      setIsError(true);
      throw new Error(`HTTP error! status: ${error}`);
    }).finally(() => {
      // setIsLoading(false);
    });

    await api.post (
      '/objectsearch',
      JSON.stringify(searchParams)
    ).then(response => {
      // console.debug('Response /objectsearch', response);
      const publicationIdsData = response.data;
      const publicationIds = publicationIdsData.items.map(item => item.encodedId);
      fetchDocuments(publicationIds);
    }).catch(error => {
      console.error('Error /objectsearch', error);
      setIsError(true);
      throw new Error(`HTTP error! status: ${error}`);
    }).finally(() => {
      // setIsLoading(false);
    });
  };

  const fetchDocuments = async (publicationIds) => {
    console.log("Количество публикаций:", publicationIds.length);

    if (!publicationIds.length) {
      return;
    }

    await api.post(
      '/documents',
      JSON.stringify({ ids: publicationIds })
    ).then(response => {
      const documentsData = response.data;
      setDocumentsData(documentsData);
      console.debug('Response /documents', 'Количество документов', documentsData.length);
    }).catch(error => {
      console.error('Error /objectsearch', error);
      setIsError(true);
      throw new Error(`HTTP error! status: ${error}`);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(location.state?.searchParams)]);

  return (
    <main className='search-results'>
      <div className='top'>
        <div className='top-header'>
          <h1>
            Ищем. Скоро будут результаты
          </h1>
          <span>
            Поиск может занять некоторое время,
            <br/>просим сохранять терпение.
          </span>
        </div>
        <img
          className='search-result-capture'
          src='/assets/img/search-result-capture.png'
          alt='Results'
        />
      </div>

      <div className='search-data'>
        <h2>Общая сводка</h2>
        <span className='count-results'>Найдено {totalDataCount} вариантов</span>
        <Summary searchData={searchData} isLoading={isLoading} setIsLoading={setIsLoading} isError={isError}/>
      </div>

      <div className='search-documents'>
        <h2>Список документов</h2>
        <Documents documentsData={documentsData}/>
      </div>
    </main>
  )
}

export default SearchResult;