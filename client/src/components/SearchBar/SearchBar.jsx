import React from "react";
import {useState} from 'react';
import {useDispatch} from "react-redux";
import {getRecipesName} from "../../redux/actions";

export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipesName(name));
        setName("")
        setCurrentPage(1);
        } 


    return(
        <div>
            <input type="text" placeholder="Search..." onChange={(e) => handleInputChange(e)} value={name}/>
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search</button>

        </div>
    )
}