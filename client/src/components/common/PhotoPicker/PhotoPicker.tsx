import React from 'react'
import styles from './PhotoPicker.module.scss'
import ReactDOM from 'react-dom'

type PropsPicker = {
  onChange: (e: any) => void
}

export const PhotoPicker = ({ onChange }: PropsPicker) => {
  const component = (
    <input 
      type='file' 
      hidden 
      id='photo-picker' 
      onChange={onChange} 
    />
  )

  return (
    ReactDOM.createPortal(
      component,
      document.getElementById('photo-picker-element') as HTMLElement
    )
  )
}
