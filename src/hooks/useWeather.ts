import axios from "axios"
import type { SearchType } from "../types/type"
// import z from "zod"
import { object, string, number, type InferOutput, parse } from 'valibot'
import { useMemo, useState } from "react"

// ! Opcion 3: Libreria 'Zod'
// const Weather = z.object({
//   name: z.string(),
//   main: z.object({
//     temp: z.number(),
//     temp_max: z.number(),
//     temp_min: z.number(),
//   })
// })
// type Weather = z.infer<typeof Weather> // * Inferir en base a este Esquema el type que declaramos 

// ! Opcion 4: Libreria 'Valibot'
// * Creando el Esquema
const WeatherSchema = object({
  name: string(),
  main: object({
    temp: number(),
    temp_max: number(),
    temp_min: number(),
  })
})

export type WeatherTypeSchema = InferOutput<typeof WeatherSchema>

const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}
export default function useWeather() {
  const [weather, setWeather] = useState<WeatherTypeSchema>(initialState)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const fetchWeather = async (dataSearch: SearchType) => {
    // console.log('Consultando...')
    const APIKey = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialState)

    // ! Opcion 2: Type Cards o ASSERTIONS Aqui SI revisamos el JSON que estamos obteniendo
    // function isWeatherResponse(weatherResult: unknown): weatherResult is Weather {
    //   // * Verificaciones
    //   return (
    //     Boolean(weatherResult) && 
    //     typeof weatherResult === 'object' &&
    //     typeof (weatherResult as Weather).name === 'string' &&
    //     typeof (weatherResult as Weather).main.temp === 'number'&&
    //     typeof (weatherResult as Weather).main.temp_max === 'number'&&
    //     typeof (weatherResult as Weather).main.temp_min === 'number'
    //   )
    // }

    try {
      const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${dataSearch.city},${dataSearch.country}&appid=${APIKey}`
      // console.log(geoURL);
      const { data } = await axios.get(geoURL) // * Consulta API del Clima
      // console.log(data);
      // console.log(data[0]);
      // ! Comprobar si existe o no ciudad
      if (!data[0]) {
        // console.log('Clima no encontrado');
        setNotFound(true)
        return
      }
      const lat = data[0].lat
      const lon = data[0].lon
      // console.log(lat, lon)
      

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      // console.log(weatherUrl);
      // ! Opcion 1: CASTEO A TYPE (asignarle el valor yo)
      // const {data: weatherResult} = await axios<Weather>(weatherUrl) // * Llamado a segunda API con sobrenombre de 'weatherResult'
      // console.log(weatherResult.main.temp_max);

      // ! Opcion 2: Type Cards
      // const { data: weatherResult } = await axios(weatherUrl) // * Llamado a segunda API con sobrenombre de 'weatherResult'
      // const resultado = isWeatherResponse(weatherResult)
      // console.log('Opcion 2 API verificacion:', resultado);
      // if (resultado) {
      //   // weatherResult.main.
      //   console.log(weatherResult.main);
      // } else {
      //   console.log('Respuesta mal formada');

      // ! Opcion 3: Libreria 'Zod'
      // const { data: weatherResult } = await axios(weatherUrl) // * Llamado a segunda API con sobrenombre de 'weatherResult'
      // const result = Weather.safeParse(weatherResult) // * Comprueba si las propiedades que obtenemos en el JSON corresponden al esquema que YO defini (true or false)
      // console.log('Resultado de Zod con Assertions', result);
      // if (result.success) {
      //   console.log(result.data.name);
      //   console.log(result.data.main.temp);
      // } else {
      //   console.log('Respuesta mal formada');
      // }

      // ! Opcion 4: Libreria 'Valibot'
      const { data: WeatherResult } = await axios(weatherUrl)
      const result = parse(WeatherSchema, WeatherResult)
      console.log(result);
      if (result) {
        // console.log(result.name);
        setWeather(result)
      }

    } catch (error) {
      console.log('Error in method fetchWeather: ', error)
    } finally { // * Se ejecute el Try o Catch, este codigo se ejecuta siempre
      setLoading(false)
    }
  }

  // ! Comprobar que el campo 'name' del objeto contenga informacion para mostrar inf de la API a Componente
  const hasWeatherData = useMemo(() => weather.name, [weather])

  return {
    // * Hacer global los metodos del customHook
    fetchWeather,
    weather,
    hasWeatherData,
    loading,
    notFound
  }
}