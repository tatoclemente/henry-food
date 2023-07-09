import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import style from './Detail.module.css'
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import Spinner from '../../components/Spinner/Spinner'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ROUTE from '../../helpers/routes.helpers';

function Detail() {
  const [recipe, setRecipe ] = useState({});
  const {detailId} = useParams();
  const [loading, setLoading] = useState(true)
  
  const history = useHistory()
  
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`/recipes/${detailId}`)
        if(data.name) {
          setRecipe(data);
        }
        window.scrollTo(0, 0);
        setLoading(false)
      } catch (error) {
        if(isMounted){
          history.push(ROUTE.NOT_FOUND)
          setLoading(false)
          console.log(error);
        }
      }
    }
    fetchData()

    return () => {
      isMounted = false; // Establecer la variable de control en false al desmontar el componente
    };
  }, [detailId, history])


  

  return (
    <div className={style.detailContainer}>
      {loading
      ? <div className={style.spinnerContainer}>
          <p>Please Wait...</p>
          <Spinner /> 
        </div> 
      : <DetailInfo recipe={recipe}/>
      }
    </div>
  )
}

export default Detail