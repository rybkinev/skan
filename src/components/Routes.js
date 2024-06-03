import React from 'react';
import {Route, Routes} from "react-router-dom";
import Main from "./Main";
import Authorization from "./Authorization";
import Search from "./Search";
import SearchResult from "./SearchResult";


export function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/result' element={<SearchResult/>}/>
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