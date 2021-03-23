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
    console.log(data)

    const time = dayjs(new Date()).format('ddd, DD MMMM, HH:mm')
    const temp = result?.main.temp
    const humidity = result?.main.humidity
    const pressure = result?.main.pressure
    const wind = result?.wind.speed
    const city = result?.name
    const country = result?.sys.country
    const feelsLike = result?.main.feels_like

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
                                <svg width="2.3em" height="1.5em" viewBox="0 0 16 16" className="bi bi-sun sun position2"
                                     fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"/>
                                    <path fill-rule="evenodd"
                                          d="M8.202.28a.25.25 0 0 0-.404 0l-.91 1.255a.25.25 0 0 1-.334.067L5.232.79a.25.25 0 0 0-.374.155l-.36 1.508a.25.25 0 0 1-.282.19l-1.532-.245a.25.25 0 0 0-.286.286l.244 1.532a.25.25 0 0 1-.189.282l-1.509.36a.25.25 0 0 0-.154.374l.812 1.322a.25.25 0 0 1-.067.333l-1.256.91a.25.25 0 0 0 0 .405l1.256.91a.25.25 0 0 1 .067.334L.79 10.768a.25.25 0 0 0 .154.374l1.51.36a.25.25 0 0 1 .188.282l-.244 1.532a.25.25 0 0 0 .286.286l1.532-.244a.25.25 0 0 1 .282.189l.36 1.508a.25.25 0 0 0 .374.155l1.322-.812a.25.25 0 0 1 .333.067l.91 1.256a.25.25 0 0 0 .405 0l.91-1.256a.25.25 0 0 1 .334-.067l1.322.812a.25.25 0 0 0 .374-.155l.36-1.508a.25.25 0 0 1 .282-.19l1.532.245a.25.25 0 0 0 .286-.286l-.244-1.532a.25.25 0 0 1 .189-.282l1.508-.36a.25.25 0 0 0 .155-.374l-.812-1.322a.25.25 0 0 1 .067-.333l1.256-.91a.25.25 0 0 0 0-.405l-1.256-.91a.25.25 0 0 1-.067-.334l.812-1.322a.25.25 0 0 0-.155-.374l-1.508-.36a.25.25 0 0 1-.19-.282l.245-1.532a.25.25 0 0 0-.286-.286l-1.532.244a.25.25 0 0 1-.282-.189l-.36-1.508a.25.25 0 0 0-.374-.155l-1.322.812a.25.25 0 0 1-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z"/>
                                </svg>
                                <span className='text-muted p1 '>Sunny</span>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x position3" fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                    <path fill-rule="evenodd"
                                          d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                </svg>
                            </div>

                        </div>
                    </div>

                    <AreaChart width={350} height={150} data={data}
                               margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="tempHour" stroke="#8884d8" strokeWidth={1} fillOpacity={1}
                              fill="url(#colorUv)"/>
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
    weatherInfo: state.weatherInfo

})

export default connect(mapStateToProps)(Card);