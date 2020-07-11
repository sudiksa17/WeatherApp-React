import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './app_component/weather.component'
import Form from './app_component/form.component'

const API_key = "f781a9e3b65a0f4f69f94a3ae472ebdb"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            description: "",
            noInput: false,
            wrongInput: false
        }

        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        }
    }

    calCelsius(temp) {
        let cell = Math.floor(temp - 273.15)
        return cell
    }

    get_WeatherIcons(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({ icon: this.weatherIcon.Thunderstorm })
                break
            case rangeId >= 300 && rangeId <= 321:
                this.setState({ icon: this.weatherIcon.Drizzle })
                break
            case rangeId >= 500 && rangeId <= 531:
                this.setState({ icon: this.weatherIcon.Rain })
                break
            case rangeId >= 600 && rangeId <= 622:
                this.setState({ icon: this.weatherIcon.Snow })
                break
            case rangeId >= 701 && rangeId <= 781:
                this.setState({ icon: this.weatherIcon.Atmosphere })
                break
            case rangeId === 800:
                this.setState({ icon: this.weatherIcon.Clear })
                break
            case rangeId >= 801 && rangeId <= 804:
                this.setState({ icon: this.weatherIcon.Clouds })
                break
            default:
                this.setState({ icon: this.weatherIcon.Clouds })
        }
    }

    getWeather = async(e) => {
        e.preventDefault()
        const city = e.target.elements.city.value
        const country = e.target.elements.country.value

        if (city && country) {
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`)

            const response = await api_call.json()

            this.setState({
                city: `${response.name},${response.sys.country}`,
                celsius: this.calCelsius(response.main.temp),
                description: response.weather[0].description,
                temp_max: this.calCelsius(response.main.temp_max),
                temp_min: this.calCelsius(response.main.temp_min),
                noInput: false,
                wrongInput: false
            })

            this.get_WeatherIcons(this.weatherIcon, response.weather[0].id)


            console.log(response)


        } else {
            this.setState({ noInput: true })
        }
    }

    render() {
        return ( <
            div className = "App" >
            <
            Form loadweather = { this.getWeather }
            noInput = { this.state.noInput }
            wrongInput = { this.state.wrongInput }
            />

            <
            Weather city = { this.state.city }
            temp_celsius = { this.state.celsius }
            temp_max = { this.state.temp_max }
            temp_min = { this.state.temp_min }
            description = { this.state.description }
            weatherIcon = { this.state.icon }
            /> </div >
        )
    }
}

export default App;