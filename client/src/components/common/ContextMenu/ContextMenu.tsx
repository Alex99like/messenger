import React, { useRef, MouseEvent, useEffect } from 'react'
import styles from './ContextMenu.module.scss'

type PropsContextMenu = {
  coordinates: {
    x: number
    y: number
  }
  options: {
    name: string
    callback: () => void
  }[]
  contextMenu: boolean
  setContextMenu: (val: boolean) => void
}

export const ContextMenu = ({ options, coordinates, contextMenu, setContextMenu }: PropsContextMenu) => {
  const contextMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target.id !== 'context-opener') {
        if (
          contextMenuRef.current && 
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu(false)
        }
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleClick = (e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>, callback: any) => {
    e.stopPropagation()
    setContextMenu(false)
    callback()
  }
  
  return (
    <div 
      className={styles.wrapper}
      style={{ top: coordinates.y, left: coordinates.y }}
      ref={contextMenuRef}
    >
      <ul className={styles.list}>
        {
          options.map(({ name, callback }) => (
            <li 
              key={name} 
              className={styles.item}
              onClick={(e) => handleClick(e, callback)}
            >
              <span>{name}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
