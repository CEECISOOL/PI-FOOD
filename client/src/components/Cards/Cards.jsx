import s from './Cards.module.css';
import {Link} from 'react-router-dom'

export default function Cards({id, image, title, diets}){  //como le paso esto por props, no necesito traerme ningun estado, lo paso todo al componente de Home porque ya tengo toda la logica ahi y renderizo card ahi, en el componente Home

    return(
        <div className={s.container}>
            <div className={s.card}>
                    <img src= {image} alt="img not found" />
                    <h2>{title}</h2>
                    <p>Diets type: {diets}</p>
                    <Link to={`/home/${id}`} >
                    <h4>Ver mas</h4>
                    </Link>
            </div>
        </div>
    )
}

