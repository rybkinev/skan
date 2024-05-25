import React from 'react';
import "../static/css/App.css"
import {Route, Routes, useNavigate} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";


export default function App() {
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   navigate('/home');
  // }, []);

  return (
    <>
      <Header/>
      <Main/>
      <Footer/>

      {/*<Routes>*/}
      {/*  <Route path='/home' >*/}
      {/*    <Route index element={<Main />} />*/}
      {/*    <Route path=':id' >*/}
      {/*      <Route index element={<Category />} />*/}
      {/*      <Route path=':id' element={<Recipes />} />*/}
      {/*    </Route>*/}
      {/*  </Route>*/}
      {/*  <Route path='/swagger' element={<Swagger />} />*/}
      {/*  <Route path="*" element={<NotFound />} />*/}
      {/*</Routes>*/}
    </>
  )
}
