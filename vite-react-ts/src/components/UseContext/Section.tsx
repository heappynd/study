import React, { FC, useContext } from 'react'
import { LevelContext } from './LevelContext.js'

const Section: FC = ({ children }) => {
  const level = useContext(LevelContext)

  return (
    <LevelContext.Provider value={level + 1}>
      <section className="section">{children}</section>
    </LevelContext.Provider>
  )
}

export default Section
