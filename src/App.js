import './App.css';
import Main from "./Components/Main";
import Card from "./Components/Card";
import React, {useState} from "react";
import {IntlProvider} from 'react-intl'



const API = 'e36f24144fe95edcc5c9d2fc4c72e7a2'


function App() {

    const messages = {
        en: {
            wind: 'Wind',
            feelsLike: 'feels Like',
            humidity: 'Humidity',
            pressure: 'Pressure',
            add: 'Add',
            cityName: 'City name...',
            city: '{city}'
        },
        ua: {
            wind: 'Вітер',
            feelsLike: 'відчувається, як',
            humidity: 'Вологість',
            pressure: 'Тиск',
            add: 'Додати',
            cityName: 'Введіть місто...',
            city: '{city}'
        },
        ru: {
            wind: 'Ветер',
            feelsLike: 'ощущается, как',
            humidity: 'Влажность',
            pressure: 'Давление',
            add: 'Добавить',
            cityName: 'Ввдите город...',
            city: '{city}'

        }
    }


    const [city, setCity] = useState()

    const [listResult, setListResult] = useState({
        hourly:[]
    })

    const [result, setResult] = useState()

    const [locale, setLocale] = useState("en");

    const handleSelect = e => {
        setLocale(e.target.value);
    };

    const getPeriodWeather = async (res) => {
        const {lat, lon} = res.coord
        const api_url = await

            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily&appid=${API}&lang=ua`)
        const list = await api_url.json()
        setListResult(list)


        console.log(list)
    }



    const getWeather = async (e) => {
        e.preventDefault()
        const city = e.target.elements.city.value
        setCity(city)
        localStorage.setItem('city', city)
        const api_url = await
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`)
        const res = await api_url.json()
        setResult(res)
       await getPeriodWeather(res)
        console.log(res)
        console.log(listResult)
    }


    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
        <div>
            <Main getWeather={getWeather} handleSelect={handleSelect}
            />
            {city ? <Card result={result}
            listResult = {listResult}
            /> : null}
        </div>
        </IntlProvider>
    );
}

export default App;
