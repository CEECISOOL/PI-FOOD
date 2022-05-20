import { useState, useEffect } from 'react';
import s from './Home.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterDiets, alphebeticalOrder, orderScore } from '../../redux/actions';
import Cards from '../Cards/Cards';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';
import Loading from "../Loading/Loading";


export default function Home() {
    const dispatch = useDispatch(),
        recipes = useSelector((state) => state.recipes),
        allDiets = useSelector((state) => state.diets)

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets())
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = Array.isArray(recipes)
    ? recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    : recipes
    const [orden, setOrden] = useState("")


    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    function handleClick(e) {
        dispatch(getRecipes());   //CLICK Y ME SETEA, ME TRAE VUELVE A TRAER TODOS LOS PERSONAJES
        setCurrentPage(1);
        //window.location.reload()
    }

    function handleFilterDiets(e) {
        e.preventDefault();
        dispatch(filterDiets(e.target.value))
        setCurrentPage(1);
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(alphebeticalOrder(e.target.value))
        setCurrentPage(1);      //cuando hago el ordenamiento, seteame la pagina en la primera
        setOrden(`Ordenado ${e.target.value}`)  //es un estado local que arranca vacio, y lo seteo para que (cuando seteo la pagina principal) me modifique el estado local y se renderice
    }

    const handleOrderScore = (e) => {
        dispatch(orderScore(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }


    return (
        <div>
            {Object.keys(currentRecipes).length !== 0 ?


                <div className={s.container}>
                    <div className={s.navBar}>
                        <div >
                            <Link to='/recipe'>
                                <button className={s.btnCreate}>Create Recipe</button>
                            </Link>
                        </div>
                        <div>
                            <h1>HENRY FOOD</h1>
                        </div>
                        <div>
                            <SearchBar
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                    <div className={s.filters}>
                        <div>
                            <h4>Alphabetical order</h4>
                            <select onChange={e => { handleSort(e) }}>
                                <option value="default" hidden> select option </option>
                                <option value='A-Z'>A-Z</option> {/*las options necesitan si o si un value. Dentro de select hay opciones, las opciones tienen un value: si el value='asc' hace algo, si el value='desc' hace esta otra cosa. Lo que me va permitir acceder que valor tiene cada una de esas opciones para que cuando desde el front yo hago click en esa opcion se haga toda la logica y la accion me entienda, yo necesito si o si pasarle un value*/}
                                <option value='Z-A'>Z-A</option>
                            </select>
                        </div>
                        <div>
                            <h4>Order by score</h4>
                            <select onChange={e => { handleOrderScore(e) }}>
                                <option value="default" disabled selected hidden> select option </option>
                                <option value="max_score">Max</option>
                                <option value="min_score">Min</option>
                            </select>
                        </div>
                        <div>
                            <h4>Filter by type of diet</h4>
                            <select onChange={e => handleFilterDiets(e)}>
                                <option value="all">All diets</option>
                                {allDiets.map(e => (
                                    <option value={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                        <div className={s.contBtn}>
                            <button className={s.btnReload} onClick={e => { handleClick(e) }}>
                                Reload all Recipes
                            </button>
                        </div>
                    </div>
                    <div className={s.paginated}>
                        <Paginated
                            recipesPerPage={recipesPerPage}
                            recipes={recipes.length - 1}
                            paginated={paginated}
                        />
                    </div>
                    
                    {Array.isArray(recipes) ? (
                        <div className={s.cards}>
                            {
                                currentRecipes?.map((el) => {
                                    return (
                                        <div>
                                            <Cards id={el.id} image={el.image} title={el.title} diets={el.diets.length > 0 ? (el.diets.map(e => e.name ? e.name : e)) : ['diets not found']} error={el.error} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ) : <p>'nal'</p>}
                    <div className={s.paginated}>
                        <Paginated
                            recipesPerPage={recipesPerPage}
                            recipes={recipes.length-1}
                            paginated={paginated}
                        />
                    </div>
                </div> : <Loading />
            }
        </div>
    )

}
