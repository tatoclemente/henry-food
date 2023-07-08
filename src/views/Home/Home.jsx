import React, { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import style from "./Home.module.css";
import { getAllRecipes, getDiets } from "../../redux/action-creators/actions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ROUTE from "../../helpers/routes.helpers";
// import { PaginationPrivider } from "./pagination";

function Home({ isSearchPerformed, showSpinner }) {
  const recipeDataDiets = useSelector(state => state.diets)
  const recipeDataAll = useSelector(state => state.allRecipes)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    if(recipeDataDiets.length === 0) dispatch(getDiets())
  }, [recipeDataDiets, dispatch])

  useEffect(()=> {
    setLoading(true)
    if(!isSearchPerformed && recipeDataAll.length === 0) {
      dispatch(getAllRecipes())
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        history.push(ROUTE.NOT_FOUND)
        console.log(error);
      })
    } else {
      setLoading(false)
    }
  }, [isSearchPerformed, recipeDataAll, dispatch, history])

  return (
    <div className={style.mainContainer}>
      {loading || showSpinner
        ? (
          <div className={style.spinnerContainer}>
            <p>Please Wait...</p>
            <Spinner /> 
          </div> 
        ) : recipeDataAll.length === 0 && !isSearchPerformed ?
        (
          <p>No se encontraron recetas.</p>
        ) : (
          <CardsContainer />
        )
      }
      
    </div>
  );
}

export default Home;
