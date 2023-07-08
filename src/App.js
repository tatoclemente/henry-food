import './App.css';
import { Home, Landing, Form, Detail } from './views'
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from 'react-router-dom';
import { getRecipesByName, clearRecicesSearch, addNewRecipe } from './redux/action-creators/actions';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import ROUTE from './helpers/routes.helpers';
import axios from 'axios';
import NotFound from './components/404NotFound/NotFound';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { Helmet } from 'react-helmet';



function App() {
  const dispatch = useDispatch()
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const history = useHistory()
  const onSearch = (name) => {
    if (!name) {
      window.alert("Ups, lo siento, debe ingresar un nombre de receta")
      return
    } 
    
    setShowSpinner(true)

    dispatch(clearRecicesSearch());
    dispatch(getRecipesByName(name))
    .then(() => {
      setShowSpinner(false); // Ocultar el spinner cuando se complete la búsqueda
    })
    .catch((error) =>{
      console.log(error);
      history.push(ROUTE.NOT_FOUND)
    });
    setIsSearchPerformed(true);
  }

  const postRecipe = async (formData) => {

    console.log("--------------FRONT------------------");
    for (const entry of formData.entries()) {
      console.log(entry);
    }
    
    setShowSpinner(true)

    try {
      const {data} = await axios.post('/recipes', formData)
      if (data.name)
      window.alert("Felicitaciones, has creado una receta con exito")
      dispatch(addNewRecipe(data))
      // history.push(ROUTE.HOME)
    } catch (error) {
      window.alert("Error al enviar el formulario")
      console.log(error.message);
    } finally {
      setShowSpinner(false)
    }
  }

  const location = useLocation()

  return (
    <div className="App">

      <Helmet>
        <meta property="og:image" content="https://res.cloudinary.com/dt2o36ezn/image/upload/v1688853869/tato/Captura_de_pantalla_2023-07-07_105858_mjp0t5.png" />
      </Helmet>

        {location.pathname !== '/'&& <NavBar 
          onSearch={onSearch}
        /> }
        
        
        <Route exact path={ROUTE.LANDING} render={ () => <Landing /> } />

        <Route path={ROUTE.HOME} render={ () => <Home 
        isSearchPerformed={isSearchPerformed} 
        showSpinner={showSpinner}/> } />

        <Route path={ROUTE.CREATE} render={ () => <Form 
        postRecipe={postRecipe}
        showSpinner={showSpinner} /> } />

        <Route path={`${ROUTE.DETAIL}/:detailId`} render={ () => <Detail /> } />

        <Route path={ROUTE.NOT_FOUND} render={ () => <NotFound />} />

    </div>
  );
}

export default App;
