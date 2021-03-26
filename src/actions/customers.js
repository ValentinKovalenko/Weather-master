import {store} from '../store/index'

import {actionsTypes} from '../store/reducers/mainReducer'


const API = 'e36f24144fe95edcc5c9d2fc4c72e7a2'

export const addWeather = (weather) => {
    store.dispatch({type: actionsTypes.FETCH_WEATHER, payload: weather})
}

export const getWeather = async (e) => {
    e.preventDefault()
    console.log(e)
    const city = e.target.elements.city.value
    localStorage.setItem('city', city)
    store.dispatch({type: actionsTypes.SET_CITY, payload: city})
    const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
    const res = await api_url.json()
    store.dispatch({type: actionsTypes.FETCH_WEATHER_INFO, payload: res})
    getPeriodWeather(res)
}

const getPeriodWeather = async (res) => {
    const {lat, lon} = res.coord
    const api_url = await

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${API}&lang=ua`)
    const list = await api_url.json()
    console.log({list})
    store.dispatch({type: actionsTypes.FETCH_WEATHER, payload: list})

    console.log('list', list)
}

export const handleSelect = e => {
    const lang = e.target.value;
    store.dispatch({type: actionsTypes.SET_LANG, payload: lang})
}

let lat;
let lon;


const successCallback = (position) => {
    console.log(position)
    lat = position.coords.latitude
    lon = position.coords.longitude
    getAddress()
}
const errorCallback = (error) => {
    console.log(error)
}

 navigator.geolocation.getCurrentPosition(successCallback, errorCallback)


const getAddress = async () => {
    const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)
    const dataGeo = await api.json()
    console.log('dataGeo', dataGeo)
    store.dispatch({type: actionsTypes.FETCH_WEATHER_INFO, payload: dataGeo})
    await getPeriodWeather(dataGeo)
}
