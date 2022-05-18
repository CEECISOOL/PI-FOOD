import s from './Cards.module.css';
import {Link} from 'react-router-dom'

export default function Cards({ id, image, title, diets, error}){  //como le paso esto por props, no necesito traerme ningun estado, lo paso todo al componente de Home porque ya tengo toda la logica ahi y renderizo card ahi, en el componente Home
    //el.diets.map(e => e.name ? e.name : e
   
  

    return(
        <div> 
        <div className={s.container}>
            <div className={s.card}> 
                <h4>{title}</h4>
                    <img src= {image} alt="img not found" />
                    <p>Diets type: {diets.join(', ')}</p>
                    <Link to={`/home/${id}`}>
                    <h4>Ver mas</h4>
                    </Link>
            </div>
        </div></div>
    )
}

