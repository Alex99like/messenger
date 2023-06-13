import React from 'react'
import { BiSearchAlt2, BiFilter } from 'react-icons/bi'
import styles from './SearchBar.module.scss'

export const SearchBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <BiSearchAlt2 className={styles['search-icon']} />
        <input  
          type='text'
          placeholder='Search or start a new chat...'
        />
        <BiFilter className={styles['filter-icon']} />
      </div>
    </div>
  )
}
