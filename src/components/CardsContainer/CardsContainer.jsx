import React from "react";
import Card from "../Cards/Card";
import style from "./CardsContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRecicesSearch,
  setCurrentPage,
} from "../../redux/action-creators/actions";
import FilteredOptions from "../FilteredOptions/FilteredOptions";
import { scrollToTop } from "../../Functions/functions";
import Pagination from "../Pagination/Pagination";
import { getTotalPages } from "../../Functions/functions";

function CardsContainer() {
  const allRecipes = useSelector((state) => state.allRecipes);
  const recipesByName = useSelector((state) => state.recipesByName);
  const currentPage = useSelector((state) => state.currentPage);

  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const hasFilteredRecipes = filteredRecipes.length > 0;

  const dispatch = useDispatch();

  // Constante de recetas por página
  const perPage = 9;

  //? ME GUARDO LOS VALORES PARA USAR EN EL SLICE QUE RENDERIZA LAS RECETAS QUE MUETRO POR PAGINA
  // El startIndex lo calculo con el valor alcual de la pagina mulriplicado por el maximo de recetas por página 
  const startIdx = currentPage * perPage;
  // El end =Index lo calculo con el valor del Indice de inicio + el total de recetas por página 
  const endIdx = startIdx + perPage;

  const handleClick = () => {
    dispatch(clearRecicesSearch());
  };

  // SIEMPRE QUE EL NUMERO DE PAGINA ESTE ENTRE EL RAGO LIMITE
  // DESPACHO EL CAMBIO DE PAGINA
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      dispatch(setCurrentPage(pageNumber));
      setTimeout(scrollToTop, 100); // Llamo a scrollToTop después de 100 milisegundos
    }                           // pasra esperar aue el estado se actualice correctamente
  };

  // Me guardo el total de las páginas a travez de la funcion getTotalPage(),
  // que recibe toda la informacion necesaria para calcularlo
  const totalPages = getTotalPages(
    hasFilteredRecipes,
    filteredRecipes,
    recipesByName,
    allRecipes,
    perPage
  );

  return (
    <div className={style.mainContainer}>
      {recipesByName.length === 0 ? (
        <div className={style.viewContainer}>
          <h1 className={style.title}>Discover all our recipes</h1>

          <FilteredOptions title="See All Recipes" />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <div className={style.cardsContainer}>
            {hasFilteredRecipes
              ? filteredRecipes
                  .slice(startIdx, endIdx)
                  .map((recipe) => (
                    <Card
                      key={recipe.id}
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.image}
                      sumary={recipe.summary}
                      healtScore={recipe.healthScore}
                      steps={recipe.steps}
                      diets={recipe.diets}
                    />
                  ))
              : allRecipes
                  .slice(startIdx, endIdx)
                  .map((recipe) => (
                    <Card
                      key={recipe.id}
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.image}
                      sumary={recipe.summary}
                      healtScore={recipe.healthScore}
                      steps={recipe.steps}
                      diets={recipe.diets}
                    />
                  ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className={style.viewContainer}>
          <button onClick={handleClick} className={style.button}>
            🔙 Go back to see all the recipes again
          </button>
          <h1 className={style.title2}>here is your search</h1>
          <FilteredOptions title="See All Searches" />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
          <div className={style.cardsContainer}>
            {hasFilteredRecipes
              ? filteredRecipes
                  .slice(startIdx, endIdx)
                  .map((recipe) => (
                    <Card
                      key={recipe.id}
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.image}
                      sumary={recipe.summary}
                      healtScore={recipe.healthScore}
                      steps={recipe.steps}
                      diets={recipe.diets}
                    />
                  ))
              : recipesByName
                  .slice(startIdx, endIdx)
                  .map((recipe) => (
                    <Card
                      key={recipe.id}
                      id={recipe.id}
                      name={recipe.name}
                      image={recipe.image}
                      sumary={recipe.summary}
                      healtScore={recipe.healthScore}
                      steps={recipe.steps}
                      diets={recipe.diets}
                    />
                  ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default CardsContainer;
