import React, {useEffect, useState} from "react";
import './index.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const SearchResult = () => {
  const location = useLocation();
  const userIsAuth = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  useEffect(() => {
    if (!userIsAuth) {
      navigate('/login');
    }
  }, [userIsAuth, navigate]);

  useEffect(() => {


  }, [JSON.stringify(location.state?.searchParams)]);

  return (
    <main className='search-result'>

    </main>
  )
}

export default SearchResult;