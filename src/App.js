import './App.css';
import Main from "./Components/Main";
import Card from "./Components/Card";
import React from "react";
import {IntlProvider} from 'react-intl'
import {connect} from "react-redux";


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


function App({ weather, weatherInfo, lang, dataGeo}) {

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <div>

                <Main/>
                {weather && weatherInfo ?
                    <Card
                /> : null}
            </div>
        </IntlProvider>
    )
}

const mapStateToProps = state => ({
    city: state.city,
    weather: state.weather,
    weatherInfo: state.weatherInfo,
    lang: state.lang,
})

export default connect(mapStateToProps)(App);
