// import "./App.module.css" // * NO FUNCIONA porque NO es dependencia
import styles from './App.module.css'
import Form from './components/form/Form'
import useWeather from './hooks/useWeather'

function App() {

  const { fetchWeather } = useWeather()

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        {/* <p>1</p> */}
        <Form 
          fetchWeather={fetchWeather}
        />
        <p>2</p>
      </div>
    </>
  )
}

export default App
