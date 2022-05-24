import React from "react";
import image from '../../Assets/404.jpg';
import s from './NotFound.module.css';
import { Link } from 'react-router-dom';


export default function NotFound(){
    
    return(
        <div className={s.notFound}>
            <div>
                <Link to='/home'>
                    <button className={s.btnH}>⬅ TO BACK HOME</button>
                </Link>
            </div>
        <img src={image} alt="" />
        </div>
    )
}