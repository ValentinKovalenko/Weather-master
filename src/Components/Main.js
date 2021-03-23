import React from 'react'
import {FormattedMessage} from "react-intl";


const Main = ({getWeather, handleSelect}) => {

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <form className="d-flex" onSubmit={getWeather}>
                    <input className="form-control me-2"
                           name='city'
                           type="text"
                           placeholder="City name..."
                           autoComplete="on"
                    />
                    <button className="btn btn-outline-success" type="submit"><FormattedMessage id='add'
                                                                                                defaultMessage='Add'/>
                    </button>
                </form>
                <select onClick={handleSelect}>
                    <option value="en">EN</option>
                    <option value="ua">UA</option>
                    <option value="ru">RU</option>
                </select>
            </div>
        </nav>
    )
}
export default Main