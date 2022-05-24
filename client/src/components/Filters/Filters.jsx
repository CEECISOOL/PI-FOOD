import React from 'react';
import { filterDiets } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Filters({ setCurrentPage, handleSort, handleOrderScore }) {
    const allDiets = useSelector((state) => state.diets);
    const dispatch = useDispatch()

    const handleFilterDiets = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value))
        setCurrentPage(1);
    }


    return (
        <>
            <div>
                <h4>Alphabetical order</h4>
                <select onChange={e => handleSort(e)}>
                    <option hidden> select option </option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
            </div>
            <div>
                <h4>Order by score</h4>
                <select onChange={e => handleOrderScore(e)}>
                    <option hidden> select option </option>
                    <option value='max_score'>Max</option>
                    <option value='min_score'>Min</option>
                </select>
            </div>
            <div>
                <h4>Filter by type of diet</h4>
                <select onChange={e => handleFilterDiets(e)}>
                    <option value="all">All diets</option>
                    {allDiets.map(e => (
                        <option key={e.name} value={e.name}>{e.name}</option>
                    ))}
                </select>
            </div>
        </>
    )

}