import './App.css';
import Main from "./Components/Main";
import Card from "./Components/Card";
import React, {useState} from "react";
import {IntlProvider} from 'react-intl'
import {connect} from "react-redux";



const API = 'e36f24144fe95edcc5c9d2fc4c72e7a2'

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


function App({city, weather, weatherInfo}) {
    const [result, setResult] = useState()
    const [locale, setLocale] = useState("en");
    const handleSelect = e => {
        setLocale(e.target.value);
    };

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div>
                <Main handleSelect={handleSelect}
                />
                {city && weather && weatherInfo ? <Card result={result}
                /> : null}
            </div>
        </IntlProvider>
    );
}

const mapStateToProps = state => ({
    city: state.city,
    weather: state.weather,
    weatherInfo: state.weatherInfo
})

export default connect(mapStateToProps)(App);
