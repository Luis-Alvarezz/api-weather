// * rfc -> Para crear la plantilla basica
// import React, { useState, type ChangeEvent } from 'react'
import type { SearchType } from '../../types/type'
import { countries } from '../../data/Coutries'
import styles from './Form.module.css'
import { useForm } from 'react-hook-form'
import { Error } from '../Errors/Error'

type FormProps = {
  fetchWeather: (data: SearchType) => Promise<void>
}

export default function Form({fetchWeather}: FormProps) {

  const { register, handleSubmit, formState: { errors } } = useForm<SearchType>()
  const searchCountryWeather = (data: SearchType) => {
    // console.log('Searching Weather...')
    // console.log(data)

    fetchWeather(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(searchCountryWeather)}>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          id='city'
          type="text"
          // name='city'
          // value={search.city}
          // onChange={handleChange}
          placeholder='Ciudad'
          {...register('city', { // * name para recuperar los datos que ingrese el usuario
            required: 'El campo de Ciudad es obligatorio'
          })}
        />
        {
          errors.city && (
            <Error>
              {errors.city?.message as string}
            </Error>
          )
        }
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select
          id='country'
          // name="country"
          // value={search.country}
          // onChange={handleChange}
          {...register('country', {
            required: 'El campo del Pais es obligatorio'
          })}
        >
          <option value="">-- Seleccione un País --</option>
          {countries.map(((country) => (
            <option key={country.code} value={country.code}>{country.name}</option>
          )))}
        </select>
        {
          errors.country && (
            <Error>
              {errors.country?.message as string}
            </Error>
          )
        }
      </div>

      <input type="submit" value='Consultar Clima' className={styles.submit} />
    </form>
  )
}
