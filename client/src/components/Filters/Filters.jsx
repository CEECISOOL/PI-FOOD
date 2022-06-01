import React from 'react';


export default function Filters({ allDiets, handleSort, handleOrderScore, handleFilterDiets }) {

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
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
            </div>
        </>
    )

}