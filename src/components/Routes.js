import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./Main";
import Authorization from "./Authorization";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>

      {/*<Route path='/'>*/}
      {/*  <Route index element={<Main />} />*/}
      {/*  <Route path=':id' >*/}
      {/*    <Route index element={<Category />} />*/}
      {/*    <Route path=':id' element={<Recipes />} />*/}
      {/*  </Route>*/}
      {/*</Route>*/}
      {/*<Route path='/swagger' element={<Swagger />} />*/}
      <Route path="*" element={<Main/>}/>
    </Routes>
  )
}

export function PublicRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Authorization/>}/>
      <Route path="*" element={<Main/>}/>
    </Routes>
  )
}