import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions"


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


    // function cleanRecipes() {

    // }
    return (
        <div>
            {Object.keys(myRecipe).length !== 0 ?
                <div>
                    <div>
                        <h1>{myRecipe.title}</h1>

                        <img src={myRecipe.image} alt="img not found" />

                        <div>
                            <h3>Score: {myRecipe.spoonacularScore}</h3>
                            <h3>Health Score: {myRecipe.healthScore}</h3>
                        </div>

                        <div>
                            <h2>Summary: </h2>
                            <h3 dangerouslySetInnerHTML={createSummary()}></h3>
                        </div>
                        <div>
                            <h3>Instructions:</h3>
                            <h3 dangerouslySetInnerHTML={createInstructions()}></h3>
                        </div>
                        <div>
                            <h3>Diets: </h3>
                            <div>
                                {myRecipe.diets.map(e => e.name ? <h3>{e.name}</h3> : <h3>{e}</h3>)}
                            </div>
                        </div>
                        <div>
                            <h3>Dish types:</h3>
                            <h3>{myRecipe.dishTypes}</h3>
                        </div>
                        <div>

                            <Link to="/home">
                                <button>
                                    Volver
                                </button>
                            </Link>
                        </div>
                    </div>
                </div> : "Loading..."
            }

        </div>
    )
}