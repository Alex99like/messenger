import React from 'react'
import styles from './Input.module.scss'

type IInput = {
  name: string
  state: string
  setState: (e: string) => void
  label: boolean
}

export const Input = ({ name, state, setState, label = false }: IInput) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {name}
        </label>
      )}
      <div>
        <input 
          type={'text'} 
          name={name} 
          value={state} 
          onChange={(e) => setState(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  )
}
