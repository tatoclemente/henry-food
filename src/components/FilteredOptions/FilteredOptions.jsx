import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearReacipeFiltered,
  filterByDiet,
  filterByOrigin,
  orderByName,
  orderByScore,
  setCurrentDiets,
  setCurrentPage,
} from "../../redux/action-creators/actions";
import style from "./FilteredOptions.module.css";
import { scrollToTop } from "../../Functions/functions";

function FilteredOptions({ title }) {
  const diets = useSelector((state) => state.diets);
  const filteredRecipes = useSelector(state => state.filteredRecipes)
  const selectedDietsFilter = useSelector(state=>state.selectedDiets)
  const dispatch = useDispatch();

  const [filterOptions, setFilterOptions] = useState({
    selectedDiet: "",
    selectedOrigin: "",
    selectedOrderByName: "",
    selectedOrderByHealth: ""
  });

  // const [selectedDietsFilter, setSelectedDietsFilter] = useState([]);

  useEffect(() => {
    const dietsArr = filteredRecipes.map((recipe) => recipe.diets).flat();
    const uniqueDiets = [...new Set(dietsArr)];

    if(!selectedDietsFilter.includes(filterOptions.selectedDiet) && uniqueDiets.includes(filterOptions.selectedDiet)) {
      // setSelectedDietsFilter((prevSelectedDiets) => (
      //   [...prevSelectedDiets, filterOptions.selectedDiet]
      // ))
      dispatch(setCurrentDiets(filterOptions.selectedDiet))
    }
  }, [dispatch, selectedDietsFilter, filteredRecipes, filterOptions.selectedDiet])

  const handleFilterByDiet = (event) => {
    const {value} = event.target

    dispatch(filterByDiet(value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedDiet: value
    }));

    handleFilterChange()
    setTimeout(scrollToTop, 100);// Llamo a scrollToTop después de 100 milisegundos
  };                            // para esperar que el estado se actualice correctamente

  const handleFilterByOrigin = (event) => {
    const {value} = event.target;
    dispatch(filterByOrigin(value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedOrigin: value
    }));
    handleFilterChange()
    setTimeout(scrollToTop, 100);// Llamo a scrollToTop después de 100 milisegundos
  };                            // para esperar que el estado se actualice correctamente

  const handleClearClick = () => {
    dispatch(clearReacipeFiltered());
    setFilterOptions({
      selectedDiet: "",
      selectedOrigin: "",
      selectedOrderByName: "",
      selectedOrderByHealth: ""
    })
    dispatch(setCurrentDiets([]))
    handleFilterChange()
    setTimeout(scrollToTop, 100);// Llamo a scrollToTop después de 100 milisegundos
  };                             // para esperar que el estado se actualice correctamente
  const handleOrderByName = (event) => {
    const {value} = event.target;
    dispatch(orderByName(value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedOrderByName: value
    }));
    handleFilterChange()
    setTimeout(scrollToTop, 100);// Llamo a scrollToTop después de 100 milisegundos
  };                            // para esperar que el estado se actualice correctamente

  const handleOrderByScore = (event) => {
    const {value} = event.target;
    dispatch(orderByScore(value));
    setFilterOptions((prevState) => ({
      ...prevState,
      selectedOrderByHealth: value
    }));
    handleFilterChange()
    setTimeout(scrollToTop, 100);// Llamo a scrollToTop después de 100 milisegundos
  };

  const handleFilterChange = () => {
    dispatch(setCurrentPage(0)) // Establezco currentPage en 0 para volver a la pagina 1
  };


  return (
    <div className={style.mainOptionsContainer}>
      <button onClick={handleClearClick}>{title}</button>
      <div className={style.optionsContainer}>
        <select
          name="filterByDiet"
          value={filterOptions.selectedDiet}
          onChange={handleFilterByDiet}
        >
          <option value="" disabled>
            Filter by Diet
          </option>
          {diets.map((diet, index) => (
            <option key={index} value={diet}>
              {diet}
            </option>
          ))}
        </select>
        <select
          name="filteredByOrigin"
          value={filterOptions.selectedOrigin}
          onChange={handleFilterByOrigin}
        >
          <option value="" disabled>
            FIlter by Origin
          </option>
          <option value="created">Created</option>
          <option value="api">API</option>
        </select>
        <select
          name=""
          value={filterOptions.selectedOrderByName}
          onChange={handleOrderByName}
        >
          <option value="" disabled>
            Order by Name
          </option>
          <option value="asc">A to Z</option>
          <option value="dsc">Z to A</option>
        </select>
        <select
          name=""
          value={filterOptions.selectedOrderByHealth}
          onChange={handleOrderByScore}
        >
          <option value="" disabled>
            Order by Health Score
          </option>
          <option value="more">More Healthy</option>
          <option value="less">Less Healthy</option>
        </select>
      </div>

      <div className={style.filtersContainer}>
      { selectedDietsFilter &&
        selectedDietsFilter?.map((filterDiet, index) => (
          <span key={index} className={style.filterTag}>{filterDiet}</span>
        ))
      }
      </div>
  
    </div>
  );
}

export default FilteredOptions;
