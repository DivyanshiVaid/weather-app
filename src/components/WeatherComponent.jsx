import React, { useState } from 'react';
import WeatherImages from './WeatherImages';
import rainImg from '../assets/images/rainImg.jpg'
import sunImg from '../assets/images/sunImg.jpg'
import cloud from '../assets/images/cloud.jpg'
import mistImage from '../assets/images/mist.jpg'
import drizzle from '../assets/images/drizzle.png'
import '../styleSheets/Layout.css';

const WeatherComponent = () => {
    const [city, setCity] = useState("")
    const [error, setError] = useState("");
    const [weather, setWeather] = useState({});

    const onInputChange = (e) => {
        setCity(e.target.value)
    }

    const APIKey = "2bb62fdef9c356a1494a8f98064acd21"

    const weatherUpdate = (city) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                console.log(response)
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
                setWeather({ ...data, image: imageUrl })
            })
            .catch((error) => {
                setWeather("");
                setError("Not found")
                console.log(error)
            })
    }

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
                        <button className="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={() => fetchDetails(city)} disabled={city.length < 2}>Search</button>
                    </div>
                </form>
                <WeatherImages imageUrl={typeof weather.main != "undefined" ? weather.image : cloud} />
                <ul className='p-4 font-weight-bold'>
                    {typeof weather.main != "undefined" ? (
                        <div>
                            <li className="text-center">
                                <p>
                                    {weather?.name}, {weather?.sys?.country}
                                </p>
                            </li>
                            <li>
                                Temperature
                                <span className="temperature">
                                    {Math.round(weather?.main?.temp)}°c ({weather?.weather[0]?.main})
                                </span>
                            </li>
                            <li>
                                Humidity
                                <span className="temperature">
                                    {Math.round(weather?.main?.humidity)}%
                                </span>
                            </li>
                            <li>
                                Visibility
                                <span className="temperature">
                                    {Math.round(weather?.visibility)} mi
                                </span>
                            </li>
                            <li>
                                Wind Speed
                                <span className="temperature">
                                    {Math.round(weather?.wind?.speed)} Km/h
                                </span>
                            </li>
                        </div>
                    ) : (
                        <li>
                            {error}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default WeatherComponent;