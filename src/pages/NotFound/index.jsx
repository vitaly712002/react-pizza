import React from 'react'
import styles from './styles.module.scss'
export const NotFound = () => {
  return (
    <div className={styles['not-found']}>
        <span>😕</span> <br/>
        <h1>Ничего не найдено</h1>
        <p>К сожалени данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  )
}
