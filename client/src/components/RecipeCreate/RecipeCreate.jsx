import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes, postRecipe } from '../../redux/actions';
import s from './RecipeCreate.module.css';

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [button, setButton] = useState(true);
    const [input, setInput] = useState({
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "",
        diets: []
    });

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    useEffect(() => {
        if (input.title.length > 0) setButton(false)
        else setButton(true)
    }, [input, setButton]);


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );

    };

    function handleSelect(e) {
        if (e.target.value !== "Select diets" && !input.diets.includes(e.target.value)) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
        }
    };

    function handleDeleteDiets(e) {
        setInput({
            ...input,
            diets: input.diets.filter(diets => diets !== e
            ),
        });
    }

    function validate(input) {
        const imgValidate = /(https?:\/\/.*\.(?:png|jpg))/;
        let testTitle = /^[A-Z][a-z][^$()!¡@#/=¿{}?*%&|<>#]*$/;
        let errors = {};

        if (!input.title) {
            errors.title = 'Title is required'
        }
        else if(!testTitle.test(input.title)){
            errors.title = 'Start the title with capital letter. Only characters "":.,_- are accepted'
        }
        else if (!input.spoonacularScore) {
            errors.spoonacularScore = 'Score is required'
        }
        else if (input.spoonacularScore > 100) {
            errors.spoonacularScore = 'Score max is 100'
        }
        else if (input.spoonacularScore < 1) {
            errors.spoonacularScore = 'Score min is 1'
        }
        else if (!input.healthScore) {
            errors.healthScore = 'Health score required'
        }
        else if (input.healthScore > 100) {
            errors.healthScore = 'Health Score max is 100'
        }
        else if (input.healthScore < 1) {
            errors.healthScore = 'Health Score min is 1'
        }
        else if (!input.image || !imgValidate.test(input.image)) {
            errors.image = 'Please insert an image type URL'
        }
        else if (!input.analyzedInstructions) {
            errors.analyzedInstructions = 'Analyzed Instructions is required!';
        }
        else if (!input.summary) {
            errors.summary = 'Summary is required'
        }
        return errors;
    }

    function handleSubmit(e) {
        if (errors.title || errors.summary || errors.spoonacularScore || errors.healthScore || errors.analyzedInstructions || errors.image) {
            e.preventDefault();
            alert('Please fill all fields');
        } else {
            e.preventDefault();
            dispatch(postRecipe(input));
            dispatch(getRecipes());
            alert('Recipe Created');
            setInput({
                title: "",
                summary: "",
                spoonacularScore: "",
                healthScore: "",
                analyzedInstructions: "",
                image: "",
                diets: []
            });
            navigate("/home");
        }
    }

    return (
        <>
            <div className={s.btnContainerC}>
                <Link to='/home'>
                    <button className={s.btnHomeC}>⬅ TO BACK HOME</button>
                </Link>
            </div>
            <div className={s.titleForm}>
                <h1>Create your recipe</h1>
            </div>
            <div className={s.container}>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.form}>
                        <div className={s.required}>
                            <p>(<span>*</span>)required</p>
                        </div>
                        <div >
                            <h4>Title: <span>*</span></h4>
                            <input type="text" value={input.title} name="title" placeholder='title your recipe...' onChange={(e) => handleChange(e)} />
                            {errors.title && (<p className={s.errors}>{errors.title}</p>)}
                        </div>
                        <div>
                            <h4>Score: <span>*</span></h4>
                            <input type="number" value={input.spoonacularScore} name="spoonacularScore" placeholder="score..." onChange={(e) => handleChange(e)} />
                            {errors.spoonacularScore && (<p className={s.errors}>{errors.spoonacularScore}</p>)}
                        </div>
                        <div>
                            <h4>Health Score: <span>*</span></h4>
                            <input type="number" value={input.healthScore} name="healthScore" placeholder="health score..." onChange={(e) => handleChange(e)} />
                            {errors.healthScore && (<p className={s.errors}>{errors.healthScore}</p>)}
                        </div>
                        <div>
                            <h4>Image: <span>*</span></h4>
                            <input type="text" value={input.image} name="image" placeholder='image type url...' onChange={(e) => handleChange(e)} />
                            {errors.image && (<p className={s.errors}>{errors.image}</p>)}
                        </div>
                        <div>
                            <h4> Analyzed Instructions: <span>*</span></h4>
                            <textarea type="textera" value={input.analyzedInstructions} name="analyzedInstructions" placeholder="recipe instructions..." rows="5" cols="40" onChange={(e) => handleChange(e)} />
                            {errors.analyzedInstructions && (<p className={s.errors}>{errors.analyzedInstructions}</p>)}
                        </div>
                        <div>
                            <h4>Summary: <span>*</span></h4>
                            <textarea type="text" value={input.summary} name="summary" placeholder="dish summary.." rows="5" cols="40" onChange={(e) => handleChange(e)} />
                            {errors.summary && (<p className={s.errors}>{errors.summary}</p>)}
                        </div>
                        <div className={s.diets}>
                            <h4>Diets: </h4>
                            <select onChange={(e) => handleSelect(e)} >
                                <option>Select diets</option>
                                {diets.map((el) => (
                                    <option key={el.name} value={el.name}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={s.btnContainerCreate}>
                        <button className={s.btnCreate} disabled={button} >CREATE RECIPE</button>
                    </div>
                </form>
                <div className={s.delete}>{input.diets.map(el => {
                    return (
                        <div className={s.opDelete}>
                            <p>{el}</p>
                            <button className={s.btnDelete} onClick={() => handleDeleteDiets(el)}>X</button>
                        </div>
                    )
                })}
                </div>
            </div>

        </>
    )
}
