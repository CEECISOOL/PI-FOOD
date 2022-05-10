import './Paginated.css';


export default function Paginated ({recipesPerPage, allRecipes, paginated}){
    const pageNumber = []

    for (let i= 0; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i+1)
    }

    return(
        <nav>
            <ul>
                { pageNumber &&
                pageNumber.map(number =>(
                    <li className='number' key={number}>
                    <button onClick={()=> paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )

}