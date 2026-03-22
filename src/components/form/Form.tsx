// * rfc -> Para crear la plantilla basica
import React, { useState, type ChangeEvent } from 'react'
import type { SearchType } from '../../types/type'
import { countries } from '../../data/Coutries'
import styles from './Form.module.css'

export default function Form() {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    // console.log('desde handleChange', e.target.value)
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => { // * Tipado de 'e' lo tomamos de colocar en el Form onSubmit(e=>)
    e.preventDefault()
    if (Object.values(search).includes('')) {
      console.log('Si hay Campos Vacios')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          id='city'
          type="text"
          name='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select
          id='country'
          name="country"
          value={search.country}
          onChange={handleChange}
          >
          <option>-- Seleccione un País --</option>
          { countries.map(((country) => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))) }
        </select>
      </div>

      <input type="submit" value='Consultar Clima' className={styles.submit} />
    </form>
  )
}
