import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, alphebeticalOrder, orderScore, filterDiets } from '../../redux/actions';
import SearchBar from '../SearchBar/SearchBar';
import Filters from '../Filters/Filters';
import Cards from '../Cards/Cards';
import Paginated from '../Paginated/Paginated';
import Loading from "../Loading/Loading";

export default function Home() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes);
    const allDiets = useSelector((state) => state.diets);
    const [loading, setLoading] = useState(true)

    const [, setOrden] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = Array.isArray(recipes)
        ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
        : recipes;

    if (recipes.length > 0 && loading) {
        setLoading(false)
    }

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
    }, [dispatch])

    function handleClick() {
        window.location.reload()
    }

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(alphebeticalOrder(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };

    const handleOrderScore = (e) => {
        dispatch(orderScore(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    const handleFilterDiets = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value))
        setCurrentPage(1);
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.navBar}>
                    <div >
                        <Link to='/recipe'>
                            <button className={s.btnCreate}>Create Recipe</button>
                        </Link>
                    </div>
                    <div>
                        <h1>APP FOOD</h1>
                    </div>
                    <div>
                        <SearchBar
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
                <div className={s.filters}>
                    <Filters
                        allDiets={allDiets}
                        handleOrderScore={handleOrderScore}
                        handleSort={handleSort}
                        handleFilterDiets={handleFilterDiets}
                    />
                    <div className={s.contBtn}>
                        <button className={s.btnReload} onClick={e => { handleClick(e) }}>
                            Reload all Recipes
                        </button>
                    </div>
                </div>
                <div className={s.paginated}>
                    <Paginated
                        recipesPerPage={recipesPerPage}
                        recipes={recipes.length}
                        paginated={paginated}
                    />
                </div>
                {Object.keys(currentRecipes).length !== 0 && !loading ?
                    <div>
                        {Array.isArray(recipes) ? (
                            <div className={s.cards}>
                                {
                                    currentRecipes?.map((el) => {
                                        return (
                                            <div className={s.card} key={el.id}
                                            >
                                                <Cards
                                                    id={el.id}
                                                    key={el.id}
                                                    image={el.image}
                                                    title={el.title}
                                                    diets={el.diets.length > 0 ? (el.diets.map(e => e.name ? e.name : e)) : ['diets not found']}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : <div className={s.error}> <h2>SORRY RECIPE NOT FOUND, TRY ANOTHER TITLE!</h2> </div>

                        }

                    </div> : !currentRecipes.length > 0 && loading ?
                        <Loading />
                        : (<div className={s.error}> <h2>SORRY THE SELECTED DIET DOES NOT HAVE ANY ASSOCIATED RECIPE!</h2> </div>)

                }
                <div className={s.paginated}>
                    <Paginated
                        recipesPerPage={recipesPerPage}
                        recipes={recipes.length}
                        paginated={paginated}
                    />
                </div>
            </div>
        </>
    )

}
