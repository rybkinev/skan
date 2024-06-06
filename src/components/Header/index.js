import React, {useEffect, useState} from "react";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import {useDispatch} from "react-redux";

export default () => {
  // const userIsAuth = useSelector((state) => state.user.isAuthenticated);
  // const login = useSelector((state) => state.user.login);
  // const dispatch = useDispatch();

  const maxWidth = 810;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= maxWidth);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {
        isMobile
          ? <MobileHeader/>
          : <DesktopHeader/>
      }
    </>
  )
}
