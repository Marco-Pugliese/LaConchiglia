import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import LandingPage from "./Components/LandingPage/LandingPage";
import Menu from "./Components/MenuPage/menu";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const pageSelected = useSelector((state) => state).Page.page;
  const isCookieAccepted = useSelector((state) => state.Cookie.isAccepted);
  const Lang = useSelector((state) => state.Lang.lang);

  useEffect(() => {
    console.log(isCookieAccepted);
    console.log(pageSelected);
    console.log(Lang);
  });
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/menu"} element={<Menu />} />
      </Routes>
    </>
  );
};

export default App;
