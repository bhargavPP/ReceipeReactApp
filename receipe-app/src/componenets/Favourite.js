import React from 'react'
import { useGlobalContext } from '../Context'

const Favourite = () => {
  const {favourite,selectMeal,removeFromFavroute}= useGlobalContext();
  return (
    <section className='favourite'>
      <div className='favourite-content'>
        <h5>
          Favourites

        </h5>
        <div className='favourite-container'>
        {
          favourite.map((item)=>{
          const {idMeal,strMealThumb:image}=item;

          return(
            <div key={idMeal} className='favourite-item'>
              <img src={image} className='favourite-img img' onClick={()=>selectMeal(idMeal,true)}></img>
              <button className='remove-btn' onClick={()=>removeFromFavroute(idMeal)}>Remove</button>
            </div>
          )
        })
      }
        </div>
      </div>
    </section>
  )
}

export default Favourite
