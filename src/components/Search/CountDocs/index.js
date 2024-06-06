import React, {useEffect, useState} from "react";
import './index.css';


const CountDocs = ({countDocs, setCountDocs}) => {
  const [countError, setCountError] = useState('');
  const [_countDocs, _setCountDocs] = useState(countDocs);

  useEffect(() => {
    setCountError('')
  }, [_countDocs]);

  const countValidate = event => {
    const value = event.target.value;
    const isNumber = /^[0-9]*$/.test(value);
    _setCountDocs(event.target.value)

    if (!isNumber) {
      setCountError('Введите корректные данные');
      setCountDocs('');
    } else {
      setCountError('');
      setCountDocs(event.target.value);
    }
  }

  return (
    <div className='count-documents'>
      <label htmlFor='input-count-docs'>
        Количество документов в выдаче<span className={countError ? 'error-label required' : 'required'}>*</span>
      </label>
      <input
        id='input-count-docs'
        placeholder='От 1 до 1000'
        onChange={e => _setCountDocs(e.target.value)}
        onBlur={countValidate}
        value={_countDocs}
        className={countError ? 'input-error' : ''}
      />
      {countError && <span className="error-message">{countError}</span>}
    </div>
  )
}

export default CountDocs;