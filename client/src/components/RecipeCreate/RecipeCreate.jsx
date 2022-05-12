import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { getDiets, postRecipe } from '../../redux/actions';
import s from './RecipeCreate.module.css';


export default function RecipeCreate() {
    const dispatch = useDispatch(),
        [errors, setErrors] = useState({})

    const [input, setInput] = useState({  //input es mi estado local
        title: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "",
        diets: []
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])


    function handleChange(e) {
        setInput({    //a mi estado input 
            ...input,   //ademas de lo que tiene 
            [e.target.name]: e.target.value   //agregale el target value de lo que este modificando, por ej name='height_min' modifica ese value, el name lo tienen todos los inputs
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value] //traeme lo que ya habia y con catenale el target value
            })
        }

    }



    function handleSubmit(e) {
     
        if (errors.title || errors.summary || errors.spoonacularScore) {
            alert("Debe ingresar el titulo y el resumen como minimo")
        } else {
            e.preventDefault();
            dispatch(postRecipe(input))
            alert('Recipe Created')
            setInput({
                title: "",
                summary: "",
                spoonacularScore: "",
                healthScore: "",
                analyzedInstructions: "",
                image: "",
                diets: []
            })
        }
    }

    function validate(input) {
        const imgValidate = /(https?:\/\/.*\.(?:png|jpg))/
        let errors = {}
        if (!input.title) {
            errors.title = 'Name is required'
        }
        else if (!input.summary) {
            errors.summary = 'Summary is required'
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
        else if (!input.analyzedInstructions) {
            errors.analyzedInstructions = 'Analyzed Instructions is required!';
        }
        else if (!input.image || !imgValidate.test(input.image)) {
            errors.image = 'Please insert an image type URL'
        }
        return errors;
    }



    return (
        <div>
            <div>
                <Link to='/home'>
                    <button>Volver al home</button>
                </Link>
            </div>
            <div className={s.titleForm}>
                <h1>Crea tu receta</h1>
            </div>
            <div className={s.container}>
                
                <form  onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.form}>
                    <div >
                        <h4>Nombre: </h4>
                        <input type="text" value={input.title} name="title" onChange={(e) => handleChange(e)} />
                        {errors.title && (<p>{errors.title}</p>)}
                    </div>
                  
                    <div>
                        <h4>Score: </h4>
                        <input type="number" value={input.spoonacularScore} name="spoonacularScore" placeholder=" " onChange={(e) => handleChange(e)} />
                        {errors.spoonacularScore && (<p>{errors.spoonacularScore}</p>)}
                    </div>
                    <div>
                        <h4>Health Score: </h4>
                        <input type="number" value={input.healthScore} name="healthScore" placeholder=" " onChange={(e) => handleChange(e)} />
                        {errors.healthScore && (<p>{errors.healthScore}</p>)}
                    </div>
                    <div>
                        <h4>Image: </h4>
                        <input required type="text" value={input.image} name="image" onChange={(e) => handleChange(e)} />
                        {errors.image && (<p>{errors.image}</p>)}
                    </div>  
                    <div>
                        <h4> Analyzed Instructions: </h4>
                        <textarea type="textera" value={input.analyzedInstructions} name="analyzedInstructions" placeholder=" " rows="5" cols="40" onChange={(e) => handleChange(e)} />
                        {errors.analyzedInstructions && (<p>{errors.analyzedInstructions}</p>)}
                    </div>
                    <div>
                        <h4>Summary: </h4>
                        <textarea type="text" value={input.summary} name="summary" placeholder=" " rows="5" cols="40" onChange={(e) => handleChange(e)} />
                        {errors.summary && (<p>{errors.summary}</p>)}

                    </div>
                    </div>
                    <div className={s.check}>
                        <h4>Diets: </h4>
                        <div className={s.checkbox}>

                            <p><input type='checkbox' value='gluten free' name='gluten free' onChange={(e) => handleCheck(e)} />gluten free</p>
                            <p><input type='checkbox' value='dairy free' name='dairy free' onChange={(e) => handleCheck(e)} />dairy free</p>
                            <p><input type='checkbox' value='lacto ovo vegetarian' name='lacto ovo vegetarian' onChange={(e) => handleCheck(e)} />Lacto ovo vegetarian</p>
                            <p><input type='checkbox' value='vegan' name='vegan' onChange={(e) => handleCheck(e)} />vegan</p>
                            <p><input type='checkbox' value='paleolithic' name='paleolithic' onChange={(e) => handleCheck(e)} />paleolithic</p>
                            <p><input type='checkbox' value='primal' name='primal' onChange={(e) => handleCheck(e)} />primal</p>
                            <p><input type='checkbox' value='pescatarian' name='pescatarian' onChange={(e) => handleCheck(e)} />pescatarian</p>
                            <p><input type='checkbox' value='fodmap friendly' name='fodmap friendly' onChange={(e) => handleCheck(e)} />fodmap friendly</p>
                            <p><input type='checkbox' value='whole 30' name='whole 30' onChange={(e) => handleCheck(e)} />whole 30</p>

                        </div>
                    </div>
                    <div className={s.btnS}>
                <button onClick={handleSubmit}>Create Recipe</button>
            </div>
                </form>
            </div>
            
        </div>
    )
}
