import s from './Paginated.module.css';


export default function Paginated ({recipesPerPage, allRecipes, paginated}){
    const pageNumber = []

    for (let i= 0; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i+1)
    }

    return(
        <div className={s.paginated}>
            <ul>
                { pageNumber &&
                pageNumber.map(number =>(
                    <li className='number' key={number}>
                    <button className={s.btnPag} onClick={()=> paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )

}