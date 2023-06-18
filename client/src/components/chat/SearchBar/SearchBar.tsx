import React from 'react'
import { BiSearchAlt2, BiFilter } from 'react-icons/bi'
import styles from './SearchBar.module.scss'
import { useStateProvider } from '@/context/StateContext'
import { REDUCER_CASES } from '@/context/constants'

export const SearchBar = () => {
  const [{ contactSearch }, dispatch] = useStateProvider()

  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <BiSearchAlt2 className={styles['search-icon']} />
        <input  
          type='text'
          placeholder='Search or start a new chat...'
          value={contactSearch}
          onChange={(e) => {
            dispatch({ type: REDUCER_CASES.SET_CONTACT_SEARCH, contactSearch: e.target.value })
          }}
        />
        <BiFilter className={styles['filter-icon']} />
      </div>
    </div>
  )
}
