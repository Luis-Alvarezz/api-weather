import axios from "axios"
import type { SearchType, Weather } from "../types/type"

export default function useWeather() {

  const fetchWeather = async (dataSearch: SearchType) => {
    // console.log('Consultando...')
    const APIKey = import.meta.env.VITE_API_KEY

    // ! Opcion 2: Type Cards o ASSERTIONS
    function isWeatherResponse(weatherResult: unknown): weatherResult is Weather {
      // * Verificaciones
      return (
        Boolean(weatherResult) && 
        typeof weatherResult === 'object' &&
        typeof (weatherResult as Weather).name === 'string' &&
        typeof (weatherResult as Weather).main.temp === 'number'&&
        typeof (weatherResult as Weather).main.temp_max === 'number'&&
        typeof (weatherResult as Weather).main.temp_min === 'number'
      )
    }

    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${dataSearch.city},${dataSearch.country}&appid=${APIKey}`
      // console.log(geoURL);
      const {data} = await axios.get(geoURL) // * Consulta API del Clima
      // console.log(data);
      const lat = data[0].lat
      const lon = data[0].lon
      // console.log(lat, lon)
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      // console.log(weatherUrl);
      // ! Opcion 1: CASTEO A TYPE (asignarle el valor yo)
      // const {data: weatherResult} = await axios<Weather>(weatherUrl) // * Llamado a segunda API con sobrenombre de 'weatherResult'
      // console.log(weatherResult.main.temp_max);

      // ! Opcion 2: Type Cards
      const {data: weatherResult} = await axios(weatherUrl) // * Llamado a segunda API con sobrenombre de 'weatherResult'
      const resultado = isWeatherResponse(weatherResult)
      console.log('Opcion 2 API verificacion:', resultado);
      if (resultado) {
        // weatherResult.main.
        console.log(weatherResult.main);
      } else {
        console.log('Respuesta mal formada');
        
      }
      
    } catch (error) {
      console.log('Error in method fetchWeather: ',error)
    }
  }

  return {
    // * Hacer global los metodos del customHook
    fetchWeather
  }
}