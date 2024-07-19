import React, { useState } from 'react';
import WeatherImages from './WeatherImages';
import rainImg from '../assets/images/rainImg.jpg'
import sunImg from '../assets/images/sunImg.jpg'
import cloud from '../assets/images/cloud.jpg'
import mistImage from '../assets/images/mist.jpg'
import drizzle from '../assets/images/drizzle.png'
import '../styleSheets/Layout.css';

const WeatherComponent = () => {
    /* get api key from env */
    const APIKey = process.env.REACT_APP_API_KEY
    /* use state to handle the states */
    const [city, setCity] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});

    /*handle onchange function */
    const onInputChange = (e) => {
        setCity(e.target.value)
        setError("")
    }

    /* Api call to fetch the data */
    const weatherUpdate = (city) => {
        setLoading(true)
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                if (response.status === 401) {
                    setError('Unauthorized. Check your API key.');
                    return;
                }
                if (response.status === 404) {
                    setError('Please enter a valid city name');
                    return;
                }
                if (!response.ok) {
                    setError('Network response was not ok ');
                }
                return response.json();
            })
            .then(data => {
                let imageUrl = ""
                if (data?.weather[0]?.main === 'Clouds') {
                    imageUrl = cloud
                } else if (data?.weather[0]?.main === 'Clear') {
                    imageUrl = sunImg
                } else if (data?.weather[0]?.main === 'Rain') {
                    imageUrl = rainImg
                } else if (data?.weather[0]?.main === 'Drizzle') {
                    imageUrl = drizzle
                } else if (data?.weather[0]?.main === 'Mist') {
                    imageUrl = mistImage
                } else {
                    imageUrl = cloud
                }
                setLoading(false)
                setWeather({ ...data, image: imageUrl })
            })
            .catch((error) => {
                setWeather("");
                setError("City weather not found")
            })
    }

    /*on submit function */
    const fetchDetails = (city) => {
        weatherUpdate(city)
    }

    return (
        <div className="d-flex justify-content-center m-3 ">
            <div className="border border-primary rounded weather-component">
                <form className="row g-3 m-3">
                    <div className="col-auto">
                        <input className="form-control mr-sm-2" type="search" placeholder="Enter City" aria-label="Search" value={city} onChange={onInputChange} />
                        <p className='text-danger'>{city.length > 20 && "City name is too large" || error}</p>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-primary my-sm-0" type="button" onClick={() => fetchDetails(city)} disabled={city.length < 2}>Search</button>
                    </div>
                </form>
                {loading ?
                    <div className="d-flex justify-content-center p-3">
                        <div className="spinner-border text-primary" role="status" style={{ width: "5rem", height: "5rem" }} />
                    </div>
                    :
                    <>
                        <WeatherImages imageUrl={typeof weather.main != "undefined" ? weather.image : cloud} />
                        <ul className='p-4 font-weight-bold'>
                            {typeof weather.main != "undefined" ? (
                                <div>
                                    <li className="text-center fs-1">
                                        <p>
                                            {weather?.name}, {weather?.sys?.country}
                                        </p>
                                    </li>
                                    <li className='fs-4'>
                                        Temperature
                                        <span className="temperature fs-4">
                                            {Math.round(weather?.main?.temp)}°c ({weather?.weather[0]?.main})
                                        </span>
                                    </li>
                                    <li className='fs-4'>
                                        Humidity
                                        <span className="temperature fs-4">
                                            {Math.round(weather?.main?.humidity)}%
                                        </span>
                                    </li>
                                    <li className='fs-4'>
                                        Visibility
                                        <span className="temperature fs-4">
                                            {Math.round(weather?.visibility)} mi
                                        </span>
                                    </li>
                                    <li className='fs-4'>
                                        Wind Speed
                                        <span className="temperature fs-4">
                                            {Math.round(weather?.wind?.speed)} Km/h
                                        </span>
                                    </li>
                                </div>
                            ) : (
                                <li className='fs-2'>
                                    {error}
                                </li>
                            )}
                        </ul>
                    </>}
            </div>
        </div>
    );
};

export default WeatherComponent;