import React from "react";
import style from "./Card.module.css";

import CheckOk from '../../images/check-mark.png';

import { Link } from "react-router-dom";
import ROUTE from "../../helpers/routes.helpers";

function Card(props) {
  return (
    <div className={style.container}>
      <Link to={`${ROUTE.DETAIL}/${props.id}`} className={style.link}>
        <div className={style.pointer}></div>
      </Link>

      <div className={style.contentContainer}>
        <div className={style.titleContainer}>
          <h3 className={style.name}>{props.name}</h3>
        </div>
        <div className={style.imageContainer}>
          <img className={style.image} src={props.image} alt={props.name} />
        </div>
        <div className={style.dietsTypesContainer}>
          <h5 className={style.listTitle}>Types of Diets</h5>
          {props.diets?.length ===0? <p className={style.textNoDiets}>There are no diets assigned to this recipe</p>:
          <ul className={style.listDiets}>
            {props.diets?.map((diet) => (
              <li key={diet} className={style.dietsTypes}>
                <img src={CheckOk} alt="ckeck-icon" className={style.checkIcon} />
                {diet}
              </li>
            ))}
          </ul>}
        </div>
      </div>
    </div>
  );
}

export default Card;
