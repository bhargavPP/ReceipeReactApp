import React, { useContext ,useEffect, useState} from 'react'

import axios from 'axios';
import { json } from 'react-router-dom';

const AppContext = React.createContext()
const allUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getFavouriteFromLocal =()=>{
    let favourite = localStorage.getItem('favourite');
    if(favourite){
        favourite = JSON.parse(localStorage.getItem('favourite'));
    }
    else{
        favourite=[];
    }
    return favourite;
}
const AppProvider=({children})=>{

const [meals,setMeals]=useState([]);
const [loading,setLoading]=useState(false);
const [searchTerm,setSearchTerm]=useState('');

const [showModal,setShowModal]=useState(false);
const [favourite,setFavourite]=useState(getFavouriteFromLocal());



const [selectedMeal,setSelectedMeal]=useState(null);
    const fetchMeals = async(url)=>{
        setLoading(true);
        try{
            const {data }= await axios(url);
            if(data.meals)
            {
                setMeals(data.meals);
            }
            else{
                setMeals([]);
            }

        }catch(error)
        {
            console.log(error.response)    ;
        }
        setLoading(false);
      }
const fetchRandomMeals =()=>{
    fetchMeals(randomMealUrl);
}

const selectMeal=(idMeal,favouriteMeal)=>{
    let meal;
if(favouriteMeal)
{
    meal=favourite.find((meal)=>meal.idMeal===idMeal);
}else{

    meal=meals.find((meal)=>meal.idMeal===idMeal);
}
    setSelectedMeal(meal);
    setShowModal(true);
}


const closeModal=()=>{
    setShowModal(false);
}

const addToFavroute=(idMeal)=>{
    const alreadFavroute = favourite.find((meal)=>meal.idMeal===idMeal);
    if(alreadFavroute)  return;

    const meal=meals.find((meal)=>meal.idMeal===idMeal);
    const updateFavourite=[...favourite,meal];
    setFavourite(updateFavourite);
    localStorage.setItem('favourite',JSON.stringify(updateFavourite));
}

const removeFromFavroute=(idMeal)=>{
    const updateFavourite=favourite.filter((meal)=>meal.idMeal!==idMeal)
    setFavourite(updateFavourite);
    localStorage.setItem('favourite',JSON.stringify(updateFavourite));
}

useEffect(()=>{
    fetchMeals(allUrl);
},[]);


    useEffect(()=>{
        if(!searchTerm)return  
        fetchMeals(`${allUrl}${searchTerm}`);
    },[searchTerm]);
return(
    <AppContext.Provider value={{loading,meals,setSearchTerm,fetchRandomMeals,showModal,selectMeal,selectedMeal,closeModal,
    addToFavroute,removeFromFavroute,favourite}}>
        {children}
    </AppContext.Provider >
)
}
export const  useGlobalContext=()=>{
    return useContext(AppContext);
}

export   {AppContext,AppProvider}