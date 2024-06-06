import React, {useEffect, useState} from "react";
import './index.css';
import CheckboxBlock from "./CheckboxBlock";
import RangeDate from "./RangeDate";
import InputINN from "./InputINN";
import {useNavigate} from "react-router-dom";
import CountDocs from "./CountDocs";


const Search = () => {
  const now = new Date();
  const [inn, setInn] = useState('');
  const [tonality, setTonality] = useState('any');
  const [countDocs, setCountDocs] = useState('');
  const [dateEnd, setDateEnd] = useState(now.toISOString().slice(0,10));
  now.setDate(now.getDate() - 1);
  const [dateStart, setDateStart] = useState(now.toISOString().slice(0,10));
  const [isFormValid, setIsFormValid] = useState(false);

  const [checkboxStates, setCheckboxStates] = useState({
    maxCompleteness: true,
    businessMentions: true,
    mainRole: true,
    riskFactorsOnly: false,
    includeMarketNews: false,
    includeAnnouncements: true,
    includeNewsSummaries: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isValid = inn && countDocs && dateStart && dateEnd;
    setIsFormValid(isValid);
  }, [inn, countDocs, dateStart, dateEnd, checkboxStates]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid) {

      const searchParams = {
        issueDateInterval: {
          startDate: `${dateStart}T00:00:00+03:00`,
          endDate: `${dateEnd}T23:59:59+03:00`
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [{
              type: "company",
              inn: inn,
              maxFullness: checkboxStates.maxCompleteness,
            }],
            onlyMainRole: checkboxStates.mainRole,
            tonality: tonality,
            onlyWithRiskFactors: checkboxStates.riskFactorsOnly,
          }
        },
        attributeFilters: {
          excludeTechNews: !checkboxStates.includeMarketNews,
          excludeAnnouncements: !checkboxStates.includeAnnouncements,
          excludeDigests: !checkboxStates.includeNewsSummaries,
        },
        limit: Number(countDocs),
        sortType: "sourceInfluence",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"]
      };

      console.debug('Search handleSubmit', 'Отправка запроса на сервер с данными:', searchParams);

      navigate('/result', { state: { searchParams: searchParams } });
    } else {
      console.debug('Форма не валидна, перенаправление не выполнено.');
    }
  };

  return (
    <main className='search'>
      {/*<div className='left'>*/}
        <div className='header-name'>
          <h1>
            Найдите необходимые данные в пару кликов.
          </h1>
          <span>
            Задайте параметры поиска.
            <br/> Чем больше заполните, тем точнее поиск
          </span>
        </div>
        <form className='filter-form' onSubmit={handleSubmit}>
          <div className='filter-form-left'>
            <InputINN
              inn={inn}
              setInn={setInn}
            />
            <div className='tonality'>
              <label>Тональность</label>
              <select
                // options={tonality}
                value={tonality}
                onChange={(e) => setTonality(e.target.value)}
              >
                <option value="any">Любая</option>
                <option value="positive">Позитивная</option>
                <option value="negative">Негативная</option>

              </select>
            </div>
            <CountDocs countDocs={countDocs} setCountDocs={setCountDocs}/>
            <RangeDate dateStart={dateStart} setDateStart={setDateStart} dateEnd={dateEnd} setDateEnd={setDateEnd}/>
          </div>
          <div className='filter-form-right'>
            <CheckboxBlock checkboxStates={checkboxStates} handleCheckboxChange={handleCheckboxChange}/>
            <div className="filter-form-right-submit">
              <button className="button" type="submit" disabled={!isFormValid}>Поиск</button>
              <span className="require-message">* Обязательные к заполнению поля</span>
            </div>
          </div>
        </form>
      {/*</div>*/}
      {/*<div className='right'>*/}
        <div className='top'>
          <img
            className='img-file'
            src='/assets/img/search-file.png'
            alt=''
          />
          <img
            className='img-folders'
            src='/assets/img/search-folders.png'
            alt=''
          />
        </div>
        <img
          className='img-capture'
          src='/assets/img/search-capture.png'
          alt=''
        />
      {/*</div>*/}
    </main>
  )
}

export default Search;