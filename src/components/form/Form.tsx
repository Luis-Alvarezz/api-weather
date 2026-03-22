// * rfc -> Para crear la plantilla basica
import { countries } from '../../data/Coutries'
import styles from './Form.module.css'

export default function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          id='city'
          type="text"
          name='city'
          placeholder='Ciudad'
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select name="country">
          <option id="country">-- Seleccione un País --</option>
          { countries.map(((country) => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))) }
        </select>
      </div>

      <input type="submit" value='Consultar Clima' className={styles.submit} />
    </form>
  )
}
