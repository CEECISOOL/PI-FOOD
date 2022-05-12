import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions"
import s from './RecipeDetails.module.css';


export default function RecipeDetails() {
    const dispatch = useDispatch()
    const { id } = useParams();


    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch])

    let myRecipe = useSelector(state => state.detail)

    function createSummary() {
        return { __html: myRecipe.summary }
    }

    function createInstructions() {
        if (myRecipe.analyzedInstructions && myRecipe.analyzedInstructions.length !== 0) {
            return ({ __html: myRecipe.analyzedInstructions})
        }

        return ({ __html: "No instructions available" })
    }


    return (
        <div>
            {Object.keys(myRecipe).length !== 0 ?
                    <div className={s.container}>
                        <div className={s.title}>
                        <h1>{myRecipe.title}</h1>
                        </div>
                        <div className={s.section}>
                            <div className={s.imgCont} >
                                <img className={s.imagen} src={myRecipe.image} alt="img not found" />
                            </div>
                            <div>
                            <div className={s.score}>
                            <h3>Score: {myRecipe.spoonacularScore}</h3>
                            </div>
                            <div className={s.healthScore}>
                            <h3>Health Score: {myRecipe.healthScore}</h3> 
                            </div>
                            <div className={s.diets}>
                                <h3>Diets: </h3>
                                {myRecipe.diets.map(e=> e.name? <h3>e.name</h3> : <h3>e</h3>)}
                            </div>
                            <div className={s.dishTypes}>
                            <h3 >Dish types:</h3>
                            <h3>{myRecipe.dishTypes ? myRecipe.dishTypes:'dishTypes not found'}</h3>
                            </div>
                        </div>
                        </div>
                        <div className={s.summary}>
                            <h2>Summary: </h2>
                            <h3 dangerouslySetInnerHTML={createSummary()}></h3>
                        </div>
                        <div className={s.instructions}>
                            <h3>Instructions:</h3>
                            <h3 dangerouslySetInnerHTML={createInstructions()}></h3>
                        </div>
                       
                        <div>

                            <Link to="/home">
                                <button>
                                    Volver
                                </button>
                            </Link>
                        </div>
                </div> : "Loading..."
            }

        </div>
    )
}