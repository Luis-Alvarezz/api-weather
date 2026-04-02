// rfc - Para crear estructura basica 

import type { WeatherTypeSchema } from "../../hooks/useWeather"
import { formatTemperature } from "../utils"

type WeatherDetailProps = {
  weather: WeatherTypeSchema
}

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div>
      <h1>Clima de: { weather.name }</h1>
      <h1> { formatTemperature(weather.main.temp) }&deg;C</h1>
      
      <div>
        <p>Min: <span> { formatTemperature(weather.main.temp_min) }&deg;C </span></p>
        <p>Max: <span> { formatTemperature(weather.main.temp_max) }&deg;C </span></p>
      </div>
    </div>
  )
}
