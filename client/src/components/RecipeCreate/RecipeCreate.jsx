import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDiets, postRecipe } from '../../redux/actions';

export default function DogCreate(){
    const dispatch = useDispatch(),
    allDiets = useSelector((state)=> state.diets),
    [errors, setErrors] = useState({})

    const [input, setInput]= useState({  //input es mi estado local
        name: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        analyzedInstructions: "",
        image: "",
        diets: []
    })

    useEffect(()=>{
        dispatch(getDiets())
    }, [dispatch])

    
    function handleChange(e){
        setInput({    //a mi estado input 
            ...input,   //ademas de lo que tiene 
            [e.target.name] : e.target.value   //agregale el target value de lo que este modificando, por ej name='height_min' modifica ese value, el name lo tienen todos los inputs
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,   
            diets: [...input.diets, e.target.value]   //traeme lo que ya habia y con catenale el target value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postRecipe(input))
        alert('Recipe Created')
        setInput({
            name: "",
            summary: "",
            spoonacularScore: "",
            healthScore: "", 
            analyzedInstructions: "",
            image: "",
            diets: []
        })
    }        
 
    function validate(input){
        let errors= {}
        if(!input.title){
            errors.title= 'Name is required'
        } 
        else if(!input.summary){
            errors.summary= 'Summary is required'
        }
        else if(!input.spoonacularScore){
            errors.spoonacularScore= 'Score is required'  
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
        else if(!input.analyzedInstructions){
            errors.analyzedInstructions = 'Analyzed Instructions is required!';
        }
        else if(!input.image){
            errors.image= 'Please insert an image URL'
        }
        return errors;
    }



    return(
        <div>
            <Link to = '/home'>
            <button>Volver al home</button>
            </Link>
            <h1>Crea tu receta</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <label>Nombre: </label>
                    <input 
                    type="text" 
                    value={input.title} 
                    name="title" 
                    onChange={(e)=>handleChange(e)}
                    />
                    {errors.title && (<p>{errors.title}</p>)}
                </div>
                <div>
                    <label>Summary: </label>
                    <input 
                    type="text" 
                    value={input.summary} 
                    name="summary" 
                    placeholder=" " 
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                {errors.summary && (<p>{errors.summary}</p>)}
                <div>
                    <label>Score: </label>
                    <input 
                    type="number" 
                    value={input.spoonacularScore} 
                    name="spoonacularScore" 
                    placeholder=" "
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                {errors.spoonacularScore && (<p>{errors.spoonacularScore}</p>)}
                <div>
                    <label>Health Score: </label>
                    <input 
                    type="number" 
                    value={input.healthScore} 
                    name="healthScore" 
                    placeholder=" " 
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                {errors.healthScore && (<p>{errors.healthScore}</p>)}
                <div>
                    <label> Analyzed Instructions: </label>
                    <input 
                    type="text" 
                    value={input.analyzedInstructions} 
                    name="analyzedInstructions" 
                    placeholder=" " 
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                {errors.analyzedInstructions && (<p>{errors.analyzedInstructions}</p>)}
                <div> 
                <div>
                    <label>Image: </label>
                    <input 
                    type="text" 
                    value={input.image} 
                    name="image" 
                    onChange={(e)=>handleChange(e)} />
                </div>
                {errors.image && (<p>{errors.image}</p>)}
                <select onChange={(e)=> handleSelect(e)}>  
                    <option>Diets</option>
                    {allDiets.map((el) =>(
                        <option value={el.name}>{el.name}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el => el + ", ")}</li></ul>
                </div>
                <button type='submit'>Create recipe</button>
           </form>
        </div>
    )
}