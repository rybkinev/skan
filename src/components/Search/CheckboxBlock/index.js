import React from "react";
import './index.css'


const CheckboxBlock = ({ checkboxStates, handleCheckboxChange }) => {
  const labels = {
    maxCompleteness: "Признак максимальной полноты",
    businessMentions: "Упоминания в бизнес-контексте",
    mainRole: "Главная роль в публикации",
    riskFactorsOnly: "Публикации только с риск-факторами",
    includeMarketNews: "Включать технические новости рынков",
    includeAnnouncements: "Включать анонсы и календари",
    includeNewsSummaries: "Включать сводки новостей",
  };

  return (
    <div className='checkbox-block'>
      {Object.keys(checkboxStates).map((key) => (
        <div key={key} className="checkbox-container">
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            name={key}
            checked={checkboxStates[key]}
            onChange={handleCheckboxChange}
            className="hidden-checkbox"
          />
          <label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? "checked-label" : ""}>
            <span className="custom-checkbox"></span>
            <span className="label-text">{labels[key]}</span>
          </label>
        </div>
      ))}
      {/*<div className=''>*/}
        {/*<input*/}
        {/*  type='checkbox'*/}
        {/*  // checked={}*/}
        {/*/>*/}
        {/*<label htmlFor={`checkbox-${key}`} className={checkboxStates[key] ? "checked-label" : ""}>*/}
        {/*  <span className="custom-checkbox">*/}
        {/*  </span>*/}
        {/*  <span className="label-text">Признак максимальной полноты</span>*/}
        {/*</label>*/}
  {/*<label>Признак максимальной полноты</label>*/}
  {/*    </div>*/}
      {/*<div className=''>*/}
      {/*  <input*/}
      {/*    type='checkbox'*/}
      {/*    // checked={}*/}
      {/*  />*/}
      {/*  <span>Упоминания в бизнес-контексте</span>*/}
      {/*</div>*/}
      {/*<div className=''>*/}
      {/*  <input*/}
      {/*    type='checkbox'*/}
      {/*    // checked={onlyMainRole}*/}
      {/*  />*/}
      {/*  <span>Главная роль в публикации</span>*/}
      {/*</div>*/}
      {/*<div className=''>*/}
      {/*  <input*/}
      {/*    type='checkbox'*/}
      {/*    // checked={onlyWithRiskFactors}*/}
      {/*  />*/}
      {/*  <span>Публикации только с риск-факторами</span>*/}
      {/*</div>*/}
      {/*<div className=''>*/}
      {/*  <input*/}
      {/*    type='checkbox'*/}
      {/*    // checked={}*/}
      {/*  />*/}
      {/*  <span>Включать технические новости рынков</span>*/}
      {/*</div>*/}
      {/*<div className=''>*/}
      {/*  <input*/}
      {/*    type='checkbox'*/}
      {/*    // checked={}*/}
      {/*  />*/}
      {/*  <span>Включать анонсы и календари</span>*/}
      {/*</div>*/}
      {/*<div className=''>*/}
      {/*  <input*/}
      {/*    type='checkbox'*/}
      {/*    // checked={}*/}
      {/*  />*/}
      {/*  <span>Включать сводки новостей</span>*/}
      {/*</div>*/}
    </div>
  )
}

export default CheckboxBlock;