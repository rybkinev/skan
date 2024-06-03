import React, {useEffect, useState} from "react";
import './index.css';


const RangeDate = ({dateStart, setDateStart, dateEnd, setDateEnd}) => {
  const [error, setError] = useState('')
  const [_dateStart, _setDateStart] = useState(dateStart);
  const [_dateEnd, _setDateEnd] = useState(dateEnd);

  const validateDateRange = () => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 0);

    if (!_dateStart || !_dateEnd) {
      setError("Обязательное поле");
    } else if (new Date(_dateStart) > new Date(_dateEnd)) {
      setError("Введите корректные данные");
    } else if (new Date(_dateStart) > currentDate || new Date(_dateEnd) > currentDate) {
      setError("Дата не может быть позже текущей даты");
    } else {
      setError("");
      setDateStart(_dateStart);
      setDateEnd(_dateEnd);
    }
  };

  useEffect(() => {
    validateDateRange();
  }, [_dateStart, _dateEnd]);

  return (
    <div className='date-range-container'>
      <label>Диапазон поиска
        <span className={error ? 'error-label required' : 'required'}>*</span>
      </label>
      <div className='date-range'>
        <input
          placeholder='Дата начала'
          type="date"
          value={_dateStart}
          className={error ? 'date-range-start input-error' : 'date-range-start'}
          onChange={e => _setDateStart(e.target.value)}
          onBlur={() => validateDateRange()}
        />
        <input
          placeholder='Дата конца'
          type="date"
          value={_dateEnd}
          onChange={e => _setDateEnd(e.target.value)}
          className={error ? 'date-range-end input-error' : 'date-range-end'}
          onBlur={() => validateDateRange()}
        />
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  )
}

export default RangeDate;