import React, { FC } from 'react'

interface IProps {
  text: string
  highlight: string
}

export const HighlightText: FC<IProps> = (props) => {
  const { highlight, text } = props

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { fontWeight: 'bold', color: 'red' }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  )
}
