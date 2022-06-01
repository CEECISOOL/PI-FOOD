import axios from 'axios';

export function getRecipes() {
    return async function (dispatch) {
        let json = await axios.get('/recipes');
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
};

export function getDiets() {
    return async function (dispatch) {
        let json = await axios.get('/types');
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
};


export function getRecipesName(name) {
    return async function (dispatch) {
        let json = await axios.get('/recipes?name=' + name);
        return dispatch({
            type: 'GET_RECIPES_NAME',
            payload: json.data
        })
    }
};

export function getDetails(id) {
    return async function (dispatch) {
        const json = await axios.get(`/recipes/${id}`);
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
};

export function cleanData() {
    return async function (dispatch) {
        let clean = {};
        return dispatch({
            type: "CLEAN_DATA",
            payload: clean
        })
    }
};

export function alphebeticalOrder(payload) {
    return {
        type: 'ALPHEBETICAL_ORDER',
        payload
    }
};

export function orderScore(payload) {
    return {
        type: 'ORDER_SCORE',
        payload
    }
};

export function filterDiets(payload) {
    return {
        type: 'FILTER_DIETS',
        payload
    }
};

export function postRecipe(payload) {
    return async function (dispatch) {
        let response = await axios.post('/recipe', payload);  //aca es donde conecto el front con el back
        return response
    }
};
