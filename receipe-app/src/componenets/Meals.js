
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../Context';
import {BsHandThumbsUp,BsHandThumbsUpFill} from 'react-icons/bs';
const Meals = () => {
  
    var {loading,meals,selectMeal,addToFavroute,removeFromFavroute}=useGlobalContext();

    if(loading){
        return <section className='section'><h4>Loading...</h4></section>
    }

    if(meals.length<1)
    {
        return <section className='section'><h4>No Record Found.</h4></section>
    }
 let localStorageFavourite = JSON.parse(localStorage.getItem('favourite'));
 
  return (
    <section className='section-center'>
      {
      meals.map((singleMeal)=>{

        const {idMeal,strMeal:title,strMealThumb:image}=singleMeal;
       
        return(
            <article key={idMeal} className='single-Meal'>
                <img src={image} style={{width:'200px'}} className='img' onClick={()=>selectMeal(idMeal)}/>
                <footer>
                    <h5>{title}</h5>
                    <button className='like-btn' onClick={()=>addToFavroute(idMeal)}>
                    
                    {localStorageFavourite.find((fav)=>fav.idMeal===idMeal) ? <BsHandThumbsUpFill/> : <BsHandThumbsUp/> }

                      </button>
                </footer>
            </article>
        )
        
      })
    }
    </section>
  )
}
export default Meals
