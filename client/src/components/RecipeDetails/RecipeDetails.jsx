import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, cleanData } from "../../redux/actions"
import s from './RecipeDetails.module.css';
import Loading from "../Loading/Loading";

export default function RecipeDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    let myRecipe = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(cleanData());
    }, [dispatch, id]);

    function createSummary() {
        return { __html: myRecipe.summary }
    }

    return (
        <>
            {Object.keys(myRecipe).length > 0 ? (
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
                                <h3>Score: {myRecipe.spoonacularScore? myRecipe.spoonacularScore : 'score not found'}</h3>
                            </div>
                            <div className={s.healthScore}>
                                <h3>Health Score: {myRecipe.healthScore? myRecipe.healthScore : 'health score not found'}</h3>
                            </div>
                            <div className={s.diets}>
                                <h3>Diets: </h3>
                                <p>{myRecipe.diets.length > 0 ? (myRecipe.diets.map(e => e.name ? e.name + '/ ' : e + '/ ')) : 'diets not found'}</p>
                            </div>
                            <div className={s.dishTypes}>
                                <h3>Dish types:</h3>
                                <div className={s.listDish}>
                                    <p>{myRecipe.dishTypes ? myRecipe.dishTypes.map(e => e + '/ ') : 'dishTypes not found'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.summary}>
                        <div className={s.sangria}>
                            <h3>Summary: </h3>
                            <p dangerouslySetInnerHTML={createSummary()}></p>
                        </div>
                    </div>
                    <div className={s.instructions}>
                        <div className={s.sangriaTwo}>
                            <h3>Instructions:</h3>
                            <p>{myRecipe.analyzedInstructions.length !== 0 ? 
                            (typeof myRecipe.analyzedInstructions === 'string' ? myRecipe.analyzedInstructions : myRecipe.analyzedInstructions.map(e =>
                                e.map(e =>
                                    e.number && e.step ? 'STEP ' + e.number + ': ' + e.step : myRecipe.analyzedInstructions
                                ))) : 'not instruccions'}</p>
                        </div>
                    </div>
                </div> 
                ) : (
                    <Loading/>
                )
            }
        </>
    )
}