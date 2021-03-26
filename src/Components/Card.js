import React from 'react'
import {useState} from "react";
import {connect} from 'react-redux'
import dayjs from "dayjs";
import {FormattedMessage} from "react-intl";
import {XAxis, YAxis, AreaChart, Area, Tooltip} from "recharts";


const Card = ({weather, weatherInfo}) => {
    const result = weatherInfo
    const data = weather?.hourly?.map(value => {
        const dataHour = new Date(value.dt * 1000)
        const tempHour = Math.trunc(value.temp - 273.1)
        return (
            {
                dataHour,
                tempHour
            }
        )
    })
    data.splice(-24)
    console.log('data', data)


    const time = dayjs(new Date()).format('ddd, DD MMMM, HH:mm')
    const temp = result?.main.temp
    const humidity = result?.main.humidity
    const pressure = result?.main.pressure
    const wind = result?.wind.speed
    const city = result?.name
    const country = result?.sys.country
    const feelsLike = result?.main.feels_like
    const icon = result?.weather[0].icon

    console.log('result',result?.weather[0].icon)

    const [feelsTemperature, setFeelsTemperature] = useState(Math.trunc(feelsLike - 273.1))
    const [temperature, setTemperature] = useState(Math.trunc(temp - 273.1))

    const getCelsius = () => {
        setTemperature(Math.trunc(temp - 273.1))
        setFeelsTemperature(Math.trunc(feelsLike - 273.1))
    }

    const getFahrenheit = () => {
        setTemperature(Math.trunc((temp - 273.15) * 9 / 5 + 32))
        setFeelsTemperature(Math.trunc((feelsLike - 273.15) * 9 / 5 + 32))

    }

    const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.tempHour));
        const dataMin = Math.min(...data.map((i) => i.tempHour));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <div className="card card1 fon">
            <div className="card-body">
                <p className="card-text">
                    <div className='container'>
                        <div className="row justify-content-between">
                            <div className="col align-self-start position">
                                <p className='my-0'><strong>{city}, {country}</strong></p>
                                <p>{time}</p>
                            </div>
                            <div className='col-6'>
                                <img src= {'http://openweathermap.org/img/w/' + icon + '.png'} className='position2' alt="..."/>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x position3"
                                     fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                    <path fill-rule="evenodd"
                                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                </svg>
                            </div>

                        </div>
                    </div>
                    <AreaChart
                        width={350}
                        height={150}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis/>
                        <YAxis/>
                        <Tooltip/>
                        <defs>
                            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset={off} stopColor="#FFDADF" stopOpacity={1} />
                                <stop offset={off} stopColor="#DBDBFE" stopOpacity={1} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="tempHour" stroke="#8884d8" fill="url(#splitColor)"/>
                    </AreaChart>
                    <div className='container'>
                        <div className='row align-items-end'>
                            <div className="row justify-content-between">
                                <div className="col align-self-start position">
                                    <p className='my-0'><strong className='strong1'>{temperature}</strong>
                                        <sup>
                                            <button onClick={getCelsius}>&deg;C</button>
                                            |
                                            <button onClick={getFahrenheit}>&deg;F</button>
                                        </sup>
                                    </p>
                                    <p className="text-muted p1">
                                        <FormattedMessage
                                            id='feelsLike'
                                            defaultMessage='feels Like'
                                        />: {feelsTemperature}
                                    </p>
                                </div>

                                <div className='col align-self-end'>
                                    <p className='p1 my-0 position1'>
                                        <FormattedMessage id='wind' defaultMessage='Wind'/> :<span
                                        className="text-primary"> {wind} m/c</span></p>
                                    <p className='p1 my-0 d-flex position1'><FormattedMessage
                                        id='humidity'
                                        defaultMessage='Humidity'
                                    />: <span
                                        className="text-primary">{humidity}%</span>
                                    </p>
                                    <p className='p1 d-flex position1'><FormattedMessage
                                        id='pressure'
                                        defaultMessage='Pressure'
                                    />:<span
                                        className="text-primary"> {pressure}Pa</span></p>
                                </div>

                            </div>
                        </div>
                    </div>
                </p>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    weather: state.weather,
    weatherInfo: state.weatherInfo,
    dataGeo: state.dataGeo

})

export default connect(mapStateToProps)(Card);