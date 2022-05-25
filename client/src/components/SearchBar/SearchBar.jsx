import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getRecipesName } from "../../redux/actions";
import s from './SearchBar.module.css';

export default function SearchBar({ setCurrentPage }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const validate = (value) => {
        let error = '';
        let testLetter = /^[a-zA-Z][^$()@!¡""#/=¿{},.?*-_%&|<>#]*$/;      // /([A-Z])\w+[a-z]/;
        if (!testLetter.test(value)) {
            error = 'Only letters are accepted for the search'
        }
        return error;
    };

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        setError(validate(e.target.value));
    };

    function handleSubmit(e) {
        e.preventDefault()
        if (!name) {
            alert('Please try putting a valid recipe')
        } else if (!error) {
            dispatch(getRecipesName(name));
            setName('');
            setCurrentPage(1);
        } else {
            alert(error)
        }

    }

    return (
        <div className={s.search}>
            <input type="text" placeholder=" Search..." onChange={(e) => handleInputChange(e)} value={name} />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Search Recipe</button>

        </div>
    )
}