const initialState = {
    recipes: [],
    diets: [],
    allRecipes: [], //una copia del estado que tenga siempre todos los personajes    
    detail: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload  //esto es para que cuando filtre, y vuelva hacer un filtrado, no me filtre sobre lo que ya tengo sino para que filtre sobre TODO
            };  //siempre trabaja sobre el estado que estoy renderizando pero para traerme todo de nuevo me hice una copia del estado que va tener siempre todo
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload,
            };
        case 'FILTER_DIETS':
            let allRecipes = state.allRecipes
            let dietsFilter = action.payload === 'all' ?
                allRecipes :
                allRecipes.filter(el => el.diets.includes(action.payload) ||
                    el.diets.map(e => e.name).includes(action.payload))

            return {
                ...state,
                recipes: dietsFilter
            };
        case 'ALPHEBETICAL_ORDER':
            let arrNew = action.payload === 'A-Z' ?   //si es A-Z entonces accede a mi estado dogs y hacele un sort(compara dos valores), dentro del if esta el valor que necesitamos ordenar y lo que hace es ir poniendo antes(-1) y despues(1) del arreglo, y si son iguales los deja igual con el 0. Es decir, que si el payload es A-Z me ejecuta el sort y los ordena de A-Z
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {  //si a es mas grande que que b devolveme 1
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;   //si b es mas grande que a devolveme -1
                    }
                    return 0   //sino devolveme 0
                }) :  //si es Z-A 
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {  //si a es mas grande que b devolveme -1
                        return -1;
                    }
                    if (b.title > a.title) { //si b es mas grande que a devolveme 1
                        return 1;
                    }
                    return 0  //sino devolveme 0
                })
            return {
                ...state,
                recipes: arrNew
            };
        case 'ORDER_SCORE':
            let orderScore = action.payload === 'min_score' ?
                state.recipes.sort(function (a, b) {
                    if (a.spoonacularScore > b.spoonacularScore) {
                        return 1;
                    }
                    if (b.spoonacularScore > a.spoonacularScore) {
                        return -1;
                    }
                    return 0;
                })
                :
                state.recipes.sort(function (a, b) {
                    if (a.spoonacularScore > b.spoonacularScore) {
                        return -1;
                    }
                    if (b.spoonacularScore > a.spoonacularScore) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                recipes: orderScore
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
        case 'POST_RECIPE':
            return {
                ...state,
            };
        case 'CLEAN_DATA':
            return {
                ...state,
                detail: {},
                videogames: [],
            }

        default:
            return state;
    }
}

export default rootReducer;