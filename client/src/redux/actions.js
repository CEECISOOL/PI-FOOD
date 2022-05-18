import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipes")  //aca es donde conecto el front con el back
    return dispatch({
        type: 'GET_RECIPES',
        payload: json.data
    })
  }
}

export function getDiets(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/types')
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}


export function getRecipesName(name){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/recipes?name=" + name);
        return dispatch({
            type: 'GET_RECIPES_NAME',
            payload: json.data
        })
    }
}

export function filterDiets(payload){
    return{
        type: 'FILTER_DIETS',
        payload
    }
}

export function alphebeticalOrder(payload){
    return{
        type: 'ALPHEBETICAL_ORDER',
        payload
    }
}

export function orderScore(payload) {
    return { 
        type: 'ORDER_SCORE',
        payload
    }
}

export function getDetails(id){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/recipes/${id}`)
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        let response = await axios.post("http://localhost:3001/recipes" , payload)  //aca es donde conecto el front con el back
    return response
    } 
}

export function cleanData () {
    return async function(dispatch){

    
    let clean = {};
     return dispatch({
        type: "CLEAN_DATA",
        payload: clean
    })
}
}
