// import "./App.module.css" // * NO FUNCIONA porque NO es dependencia
import styles from './App.module.css'
import Form from './components/Form/Form'
import Spinner from './components/Spinner/Spinner'
import WeatherDetail from './components/WeatherDetail/WeatherDetail'
import useWeather from './hooks/useWeather'
import { Error } from './components/Errors/Error'

function App() {

  const { fetchWeather, weather, hasWeatherData, loading, notFound } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        {/* <p>1</p> */}
        <Form 
          fetchWeather={fetchWeather}
        />

        {
          loading && <Spinner />
        }
        {
          hasWeatherData && 
          <WeatherDetail
            weather={weather}
          />
        }
        {
          notFound && <Error>Ciudad No Encontrada</Error>
        }
      </div>
    </>
  )
}

export default App
