import styles from './Error.module.css'

export const Error = ({ children }: { children: React.ReactNode}) => {
  
  return (
    <p className={styles.error}>
      { children }
    </p>
  )
}
