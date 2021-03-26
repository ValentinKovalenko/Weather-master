
export const actionsTypes = {
    FETCH_WEATHER: 'FETCH_WEATHER',
    SET_CITY:'SET_CITY',
    FETCH_WEATHER_INFO: 'FETCH_WEATHER_INFO',
    SET_LANG: 'SET_LANG',
}

const initialState = {
    weather: null,
    weatherInfo: null,
    city:null,
    lang: 'en',
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCH_WEATHER_INFO:
            return {
                ...state,
                weatherInfo: action.payload
            }
        case actionsTypes.SET_CITY:
            return {
                ...state,
                city: action.payload
            }
        case actionsTypes.FETCH_WEATHER:
            return {
                ...state,
                weather: action.payload
            }
        case actionsTypes.SET_LANG:
            return {
                ...state,
                lang: action.payload
            }
        default:
            return state
    }
}