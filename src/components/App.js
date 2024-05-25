import React from 'react';
import "../static/css/App.css"
import {Route, Routes, useNavigate} from "react-router-dom";

export default function App() {
  // const navigate = useNavigate();

  // React.useEffect(() => {
  //   navigate('/home');
  // }, []);

  return (
    <>
      <h1>TEST</h1>
      {/*<Header />*/}

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
