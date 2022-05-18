import React from "react";
import {useState} from 'react';
import {useDispatch} from "react-redux";
import {getRecipesName} from "../../redux/actions";
import s from './SearchBar.module.css';


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState('')


    const validate = (value) => {
        let error='';
        let testSpace = /^\S+/;
        let testNum = /^[0-9]+$/
        if(!testSpace.test(value)){
            error = 'No se permiten espacios en blanco al inicio para realizar la búsqueda';
        } else if(testNum.test(value))
        {
            error= 'No se permiten numeros'
        } else if(!value){
            error='nombre no existe'
        }
        return error;
    
    }
    

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        setError(validate(e.target.value))

    }

    function handleSubmit(e){
        e.preventDefault()
        if (!name) {
            alert('Intenta introduciendo un nombre de un país')
        } else if(!error){
            dispatch(getRecipesName(name));
        } else {
            alert(error)
        }
        setName('');
        setCurrentPage(1);
    
    } 


    return(
        <div className={s.search}>
            <input type="text" placeholder=" Search..." onChange={(e) => handleInputChange(e)} value={name}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search Recipe</button>

        </div>
    )
}