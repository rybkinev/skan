import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Welcome from "./Welcome";
import Authorization from "./Authorization";
import Search from "./Search";
import SearchResult from "./SearchResult";


export function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/result' element={<SearchResult/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}


export function PublicRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Authorization/>}/>
      <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}