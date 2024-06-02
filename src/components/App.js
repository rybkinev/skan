import React from 'react';
import "../static/css/App.css"
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import store from "../store/store";
import {PrivateRoutes, PublicRoutes} from "./Routes";


export default function App() {
  const state = store.getState();
  const userIsAuth = state.user.isAuthenticated;
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   navigate('/home');
  // }, []);

  return (
    <>
      <Header/>

      {userIsAuth ?
        <PrivateRoutes/>
      :
        <PublicRoutes/>
      }

      <Footer/>
    </>
  )
}
