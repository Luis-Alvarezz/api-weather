// import "./App.module.css" // * NO FUNCIONA porque NO es dependencia
import styles from './App.module.css'
import Form from './components/form/Form'

function App() {

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>

      <div className={styles.container}>
        {/* <p>1</p> */}
        <Form />
        <p>2</p>
      </div>
    </>
  )
}

export default App
