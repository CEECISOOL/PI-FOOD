const initialState = {
    recipes: [],
    diets: [],
    allRecipes: [],
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload,
            };
        case 'GET_RECIPES_NAME':
            return {
                ...state,
                recipes: action.payload
            };
        case 'GET_DETAILS':
            return {
                ...state,
                detail: action.payload
            };
        case 'CLEAN_DATA':
            return {
                ...state,
                detail: {},
                videogames: [],
            };
        case 'ALPHEBETICAL_ORDER':
            let arrNew = action.payload === 'A-Z' ?
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0
                }) :  //si es Z-A 
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                recipes: arrNew
            };
        case 'ORDER_SCORE':
            let orderScore = action.payload === 'min_score'
                ? state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return 1;
                    }
                    if (b.healthScore > a.healthScore) {
                        return -1;
                    }
                    return 0;
                })
                : state.recipes.sort(function (a, b) {
                    if (a.healthScore > b.healthScore) {
                        return -1;
                    }
                    if (b.healthScore > a.healthScore) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: orderScore
            };
        case 'FILTER_DIETS':
            let allRecipes = state.allRecipes;
            let dietsFilter = action.payload === 'all'
                ? allRecipes
                : allRecipes.filter(el => el.diets.includes(action.payload) ||
                    el.diets.map(e => e.name).includes(action.payload))
            return {
                ...state,
                recipes: dietsFilter
            };
        case 'POST_RECIPE':
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default rootReducer;