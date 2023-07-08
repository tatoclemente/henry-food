import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";

// Import Icon
import Glass from '../../images/searching.png';

import style from "./SearchBar.module.css";
import { clearReacipeFiltered, setCurrentDiets, setCurrentPage } from '../../redux/action-creators/actions';

function SearchBar({ onSearch }) {

  const [isExpanded, setIsExpanded] = useState(false);

  const [menorAncho1055, setMenorAncho1055] = useState(window.innerWidth < 1055);

  useEffect(() => {
    const actualizarAnchoVentana = () => {
      setMenorAncho1055(window.innerWidth < 1055);
    };

    window.addEventListener('resize', actualizarAnchoVentana);

    return () => {
      window.removeEventListener('resize', actualizarAnchoVentana);
    };
  }, []);

  const globalStateRecipes = useSelector((state) => state.allRecipes);

  const dispatch = useDispatch()

  const [name, setName] = useState("");
  const [nameOptions, setNameOptions] = useState([]);

  useEffect(() => {
    const nameData = globalStateRecipes.map((recipe) => recipe.name);
    
    const filteredNameData = nameData.filter((nameState) => nameState.toLowerCase().includes(name.toLowerCase()));

    const limitedOptions = filteredNameData.slice(0, 10);

    if (limitedOptions.length > 0 && name.length > 0) {
      setNameOptions(limitedOptions);     
    } else {
      setNameOptions([])
    }
    return () => {
      // Limpiar el estado nameOptions cuando el componente se desmonta
      setNameOptions([]);
    };
    
  }, [name, globalStateRecipes]);

  // console.log(nameOptions);

  const handleChange = (event) => {
    const { value } = event.target;
    setName(value);
    
  };

  const handleNameClick = () => {
      const query = name
      setName("")
      setNameOptions([])
      handleFilterChange()
      onSearch(query)
      dispatch(clearReacipeFiltered())
      dispatch(setCurrentDiets([]))
  }

  const handleSearchClick = (nameOption) => {
    if(nameOption) {
      setName("")
      setNameOptions([])
      handleFilterChange()
      onSearch(nameOption)
      dispatch(clearReacipeFiltered())
      dispatch(setCurrentDiets([]))
      setIsExpanded(false);
    }
  }

  const handleFilterChange = () => {
    dispatch(setCurrentPage(0)) // Establezco currentPage en 0 para volver a la pagina 1
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };
  
  const handleInputBlur = () => {
    if (name === "") {
      setIsExpanded(false);
    }
  };
  return (
    <div className={`${style.searchBarContainer} ${isExpanded || !menorAncho1055 ? style.expanded : ''}`}>

      {/* <div className={style.label}>
        <label>COME ON!, SEARCH YOUR FAVORITE RECIPES</label>
      </div> */}
      <div className={style.searchBar}>
        <div className={style.inputContainer}>
          <input
            type="search"
            id="search"
            value={name}
            onChange={handleChange}
            onClick={handleInputClick}
            onBlur={handleInputBlur}
            placeholder="Start looking for..."
            className={style.input}
            autoComplete="off"
          />
          <span className={style.glass}><img className={style.glassImg} src={Glass} alt="glass" /></span>
        </div>
        <button
          className={style.button}
          onClick={() => handleNameClick()}
        >
          Search
        </button>
      </div>

      {nameOptions.length > 0 && (
        <div className={style.dropdown}>
          <ul className={style.dropdownMenu}>
            {nameOptions.map((option, index) => {
              return (
                <li
                  className={style.dropdownItem}
                  key={index}
                  onClick={() =>handleSearchClick(option)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
