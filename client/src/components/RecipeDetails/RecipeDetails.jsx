import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, cleanData } from "../../redux/actions"
import s from './RecipeDetails.module.css';
import Loading from "../Loading/Loading";


export default function RecipeDetails() {
    const dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(getDetails(id))
        dispatch(cleanData())

    }, [dispatch, id])



    let myRecipe = useSelector(state => state.detail)

    function createSummary() {
        return { __html: myRecipe.summary }
    }



    return (
        <div>
            {Object.keys(myRecipe).length !== 0 ?

                <div className={s.container}>
                    <div className={s.btnContainer}>
                        <Link to="/home">
                            <button className={s.btnHome}>⬅ TO BACK HOME</button>
                        </Link>
                    </div>
                    <div className={s.title}>
                        <h2>{myRecipe.title}</h2>
                    </div>
                    <div className={s.section}>
                        <div className={s.imgCont} >
                            <img className={s.imagen} src={myRecipe.image} alt="img not found" />:
                        </div>
                        <div className={s.sectionTwo}>
                            <div className={s.score}>
                                <h3>Score: {myRecipe.spoonacularScore}</h3>
                            </div>
                            <div className={s.healthScore}>
                                <h3>Health Score: {myRecipe.healthScore}</h3>
                            </div>
                            <div className={s.diets}>
                                <h3>Diets: </h3>
                                <h3>{myRecipe.diets.length > 0 ? (myRecipe.diets.map(e => e.name ? e.name : e + '/ ')) : ['diets not found']}</h3>
                            </div>
                            <div className={s.dishTypes}>
                                <h3>Dish types:</h3>
                                <div className={s.listDish}>
                                    <h4>{myRecipe.dishTypes ? myRecipe.dishTypes.map(e => e + '/ ') : 'dishTypes not found'}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.summary}>
                        <div className={s.sangria}>
                            <h3>Summary: </h3>
                            <h3 dangerouslySetInnerHTML={createSummary()}></h3>
                        </div>
                    </div>
                    <div className={s.instructions}>
                        <div className={s.sangriaTwo}>
                            <h3>Instructions:</h3>
                            <h3>{myRecipe.analyzedInstructions ? (typeof myRecipe.analyzedInstructions === 'string' ? myRecipe.analyzedInstructions : myRecipe.analyzedInstructions.map(e =>
                                e.map(e =>
                                    e.number && e.step ? 'paso ' + e.number + ': ' + e.step : myRecipe.analyzedInstructions
                                ))) : 'not'}</h3>
                        </div>
                    </div>

                </div> : <Loading />
            }

        </div>
    )
}