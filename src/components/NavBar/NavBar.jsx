import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../images/gorrito-logo.png";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ROUTE from "../../helpers/routes.helpers";

function NavBar(props) {
  const location = useLocation()

  const [menorAncho1055, setMenorAncho960] = useState(window.innerWidth < 1055);

  useEffect(() => {
    const actualizarAnchoVentana = () => {
      setMenorAncho960(window.innerWidth < 1055);
    };

    window.addEventListener('resize', actualizarAnchoVentana);

    return () => {
      window.removeEventListener('resize', actualizarAnchoVentana);
    };
  }, []);
  return (
    <nav className={style.container}>
      <div className={style.logoContainer}>
        <img className={style.logo} src={Logo} alt="logo" />
        <h1>Henry Food</h1>
      </div>
      <div className={style.searchBarPosition}>
        {location.pathname === '/home' && <SearchBar onSearch={props.onSearch} />}
      </div>
      <div className={style.menuContainer}>
        <ul>
          <div className={style.menu}>
            <li className={style.item}>
              <NavLink to="/home" activeClassName={style.active}>HOME</NavLink>
            </li>
            <li className={style.item}>
              <NavLink exact to="/" activeClassName={style.active}>LANDING</NavLink>
            </li>
          </div>
          {
            location.pathname === ROUTE.HOME
            ? <div className={style.itemCreate}>
                 <span className={style.emoji}>👉</span>
                 <NavLink to="/create">{!menorAncho1055?'create your own recipe here!': 'New Recipe'}</NavLink>
               </div>
            : ""
          }
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
