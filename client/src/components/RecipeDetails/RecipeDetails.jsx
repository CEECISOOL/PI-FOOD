import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, getRecipes } from "../../redux/actions"
import s from './RecipeDetails.module.css';


export default function RecipeDetails() {
    const dispatch = useDispatch()
    const { id } = useParams()



    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch])


    let myRecipe = useSelector(state => state.detail)

    function createSummary() {
        return { __html: myRecipe.summary }
    }



    return (
        <div>
            {Object.keys(myRecipe).length !== 0 ?

                <div className={s.container}>
                    <div>
                        <Link to="/home">
                            <button>
                                Volver
                            </button>
                        </Link>
                    </div>
                    <div className={s.title}>
                        <h2>{myRecipe.title}</h2>
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
                                <div className={s.listdiets}>
                                <h3>{myRecipe.diets.length > 0 ? (myRecipe.diets.map(e => e.name ? e.name : e)) : ['diets not found']}</h3>
                            </div></div>
                            <div className={s.dishTypes}>
                                <h3 >Dish types:</h3>                               
                                <div className={s.listDish}>
                                <p>{myRecipe.dishTypes ? myRecipe.dishTypes.map(e=> <li>{e} ✔ </li>): 'dishTypes not found'}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.summary}>
                        <h2>Summary: </h2>
                        <h3 dangerouslySetInnerHTML={createSummary()}></h3>
                    </div>
                    <div className={s.instructions}>
                        <h3>Instructions:</h3>
                        <h3>{myRecipe.analyzedInstructions.length? myRecipe.analyzedInstructions.map(e=>
                        e.map(e=>
                            e.number && e.step?'paso ' + e.number + ': ' + e.step : 'not'
                        )): 'not'}</h3>
                    </div>

                </div> : "Loading..."
            }

        </div>
    )
}