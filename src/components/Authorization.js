import React, {useEffect, useState} from "react";
import '../static/css/Authorization.css'
import api from "../API/api";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../store/userSlice";

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startsWithPhone = [
    '+',
    '7',
    '8',
    '9'
  ]

  useEffect(() => {
    // При редактировании логина или пароля убираю ошибку
    setLoginError('');
    setPasswordError('');
  }, [password, username]);

  const validatePhoneNumber = (username) => {
    // Если логин начинается с + тогда считаем что это номер телефона и проверяем его,
    // в противном случае это логин, его корректность проверить может только сервер
    // При регистрации пользователя это тоже нужно учитывать
    if (!username.startsWith('+')) {
      return username;
    }
    const phone = `+${username.replace(/\D/g, '')}`;

    const phoneRegex = /^\+7\d{3}\d{3}\d{2}\d{2}$/;
    if (!phoneRegex.test(phone)) {
      setLoginError('Введите корректные данные');
      return '';
    }
    setLoginError('');
    return phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = validatePhoneNumber(username);
    if (!login) {
      return;
    }

    try {
      const response = await api.post(
        '/account/login',
        {
          login: login,
          password:password
        }
      );

      const { accessToken, expire } = response.data;

      console.debug('handleSubmit 1', response.data);
      console.debug('accessToken', accessToken);

      dispatch(setUser({accessToken: accessToken, expire: expire, login: login}));
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      if (error.response?.status === 401) {
        setPasswordError('Неправильный пароль');
      }
      else {
        console.debug('Auth error not 401');
        // TODO Желательно показывать какую то другую ошибку
        setPasswordError('Неправильный пароль');
      }
    }
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    let inputReplace = input.replace(/\D/g, '');
    let formattedInput = '';

    const input_1 = inputReplace.slice(0, 1);
    if (!startsWithPhone.find(i => i === input_1)) {
      setUsername(input);
      return;
    }

    if (inputReplace.length <= 1) {
      formattedInput = input;
    // } else if (inputReplace.length <= 2) {
    //     if (input_1 === '9') {
    //       formattedInput = `+7 ${inputReplace.slice(0, 2)}`
    //     }
    } else if (inputReplace.length <= 4) {
      formattedInput = `+${inputReplace.slice(0, 1)} ${inputReplace.slice(1, 4)}`;
    } else if (inputReplace.length <= 7) {
      formattedInput = `+${inputReplace.slice(0, 1)} ${inputReplace.slice(1, 4)} ${inputReplace.slice(4, 7)}`;
    } else if (inputReplace.length <= 9) {
      formattedInput = `+${inputReplace.slice(0, 1)} ${inputReplace.slice(1, 4)} ${inputReplace.slice(4, 7)} ${inputReplace.slice(7, 9)}`;
    } else {
      formattedInput = `+${inputReplace.slice(0, 1)} ${inputReplace.slice(1, 4)} ${inputReplace.slice(4, 7)} ${inputReplace.slice(7, 9)} ${inputReplace.slice(9, 11)}`;
    }

    setUsername(formattedInput)
  };

  return (
    <main className='auth'>
      <div className='left'>
        <h1>
          Для оформления подписки на тариф, необходимо авторизоваться.
        </h1>
        <img src='/img/auth-capture.png' alt=''/>
      </div>
      <div className='auth-form'>

        <img className='auth-lock' src='/img/auth-lock.png' alt=''/>

        <div className='auth-header'>
          <span className='login'>Войти</span>
          <span className='registration'>Зарегистрироваться</span>
        </div>
        <form className="login-form" method='post' onSubmit={handleSubmit}>
          <div className="wrap-input" data-validate="Enter username">
            <span>Логин или номер телефона:</span>
            <input
              // placeholder='Имя пользователя'
              type='text'
              value={username}
              autoComplete='on'
              required
              className={loginError ? 'input-error' : ''}
              // onChange={(e) => setUsername(e.target.value)}
              onChange={handlePhoneNumberChange}
            />
            {loginError && <span className="error-message">{loginError}</span>}
          </div>
          <div className="wrap-input" data-validate="Enter password">
            <span>Пароль:</span>
            <input
              // placeholder='Пароль'
              type='password'
              value={password}
              autoComplete='on'
              required
              className={passwordError ? 'input-error' : ''}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>
          <button
            className="login-form-btn"
            type='submit'
            disabled={!(username && password) }
          >
            Войти
          </button>
        </form>
        <span className='restore-pwd'>Восстановить пароль</span>
        <div className='oauth'>
          <span>Войти через:</span>
          <div className='oauth-container'>
            <div className='provider google'>
              <img src='/img/logo-google.png' alt='Google'/>
            </div>
            <div className='provider facebook'>
              <img src='/img/logo-facebook.png' alt='Facebook'/>
            </div>
            <div className='provider yandex'>
              <img src='/img/logo-yandex.png' alt='Яндекс'/>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}