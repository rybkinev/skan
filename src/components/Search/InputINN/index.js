import React, {useEffect, useState} from "react";
import './index.css';


const InputINN = ({inn, setInn}) => {
  const [error, setError] = useState('')
  const [_inn, _setInn] = useState(inn)

  // useEffect(() => {
  //   _setInn(inn);
  // }, []);

  useEffect(() => {
    setError('');
  }, [_inn]);

  const validateINN = (innForValidate) => {
    if (!innForValidate) {
      setError('Обязательное поле');
    }

    // Проверка длины ИНН
    if (!/^(\d{10}|\d{12})$/.test(innForValidate)) {
      setError('Введите корректные данные');
      return;
    }

    const checkSum = (coefficients) => {
        let n = 0;
        for (let i = 0; i < coefficients.length; i++) {
            n += coefficients[i] * parseInt(innForValidate.charAt(i), 10);
        }
        return n % 11 % 10;
    };

    // Проверка 10-значного ИНН
    if (innForValidate.length === 10) {
      const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8];
      if (parseInt(innForValidate.charAt(9), 10) === checkSum(coefficients)) {
        setInn(innForValidate);
        setError('');
        return;
      }
      else {
        setError('Введите корректные данные');
        return;
      }
    }

    // Проверка 12-значного ИНН
    if (innForValidate.length === 12) {
        const coefficients1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        const coefficients2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        const check1 = parseInt(innForValidate.charAt(10), 10) === checkSum(coefficients1);
        const check2 = parseInt(innForValidate.charAt(11), 10) === checkSum(coefficients2);
        if (check1 && check2) {
          setInn(innForValidate);
          setError('');
          return;
        }
        else {
          setError('Введите корректные данные');
          return;
        }
    }

    // Если выполнение доходит до этого места, то что-то явно пошло не так
    setError('Введите корректные данные');
  }

  return (
    <div className='inn'>
      <label htmlFor='input-inn'>
        ИНН Компании<span className={error ? 'error-label required' : 'required'}>*</span>
      </label>
      <input
        id='input-inn'
        name='INN'
        type='text'
        value={_inn}
        onChange={e => _setInn(e.target.value)}
        onBlur={() => validateINN(_inn)}
        placeholder='10 или 12 цифр'
        className={error ? 'input-error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default InputINN;