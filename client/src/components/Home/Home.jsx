import {useState, useEffect } from 'react';
import s from './Home.module.css';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, getDiets, filterDiets, alphebeticalOrder, orderScore} from '../../redux/actions';
import Cards from '../Cards/Cards';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar';
//import Loading from "./Loading/Loading";


export default function Home(){
    const dispatch = useDispatch(),
    allRecipes = useSelector((state)=> state.recipes),
    allDiets = useSelector((state)=> state.diets)

    useEffect(()=>{
        dispatch(getRecipes());
        dispatch((getDiets()))
    }, [dispatch])

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setDogsPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe= indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    const [orden, setOrden] = useState("")


    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());   //CLICK Y ME SETEA, ME TRAE VUELVE A TRAER TODOS LOS PERSONAJES
    }

    function handleFilterDiets(e) {
        e.preventDefault();
        dispatch(filterDiets(e.target.value))
        setCurrentPage(1);
    }

    function handleSort(e){
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


    return(
    
            <div>
            <Link to='/recipe'>Create Recipe</Link>
            <h1>Titulo de la pag a modificar</h1>
            <button onClick={e=> {handleClick(e)}}>
                Reload all Recipes
            </button>
            <h1>Hello </h1>
            <div>
                <h1>Order</h1>
                <select onChange={e=> {handleSort(e)}}>
                    <option value='A-Z'>A-Z</option> {/*las options necesitan si o si un value. Dentro de select hay opciones, las opciones tienen un value: si el value='asc' hace algo, si el value='desc' hace esta otra cosa. Lo que me va permitir acceder que valor tiene cada una de esas opciones para que cuando desde el front yo hago click en esa opcion se haga toda la logica y la accion me entienda, yo necesito si o si pasarle un value*/}
                    <option value='Z-A'>Z-A</option>
                </select>
                <select onChange={e=> {handleOrderScore(e)}}>
                    <option>Order by Score</option>
                    <option value="max_score">Max</option>
                    <option value="min_score">Min</option>
                </select>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="all">All diets</option>
                    <option value="gluten free">Gluten free</option>
                    <option value="dairy free">Dairy free</option>
                    <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap friendly</option>
                    <option value="whole 30">Whole30</option>
                </select>
            </div>
            <Paginated 
                recipesPerPage={recipesPerPage}  
                allRecipes={allRecipes.length-1}
                paginated= {paginated}
            />
            <SearchBar
                setCurrentPage={setCurrentPage}/>
            <div className={s.cards}>
            {
                currentRecipes?.map((el) =>{   
                    return(
                        <div>
                                <Cards id={el.id} image={el.image} title={el.title} diets={el.diets.map(e => e.name ? e.name : e)}/>
                        </div>
                    );
                })
            }
            </div>
        </div>
    )

}
