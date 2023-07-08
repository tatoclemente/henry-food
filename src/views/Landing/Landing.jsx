import React from "react";
import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import FriedEgg from '../../images/huevo-frito.png'

function Landing() {
  return (
    <div className={style.landingContainer}>
      <div className={style.landingTitle}>Welcome To <b>Henrys Food App</b></div>
      <Link className={style.landingLink} to="/home">
        <button className={style.landingButton}>Go To Home</button>
      </Link>
      <img src={FriedEgg} alt="fried-egg" className={style.friedEgg} />
    </div>
  );
}

export default Landing;
