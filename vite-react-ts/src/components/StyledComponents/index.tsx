import React from 'react'
import Button, { TomatoButton } from './Button'

const StyledComponents = () => {
  return (
    <div>
      StyledComponents
      <Button>Button</Button>
      <Button primary>Button</Button>
      <TomatoButton as="a" href="#">
        TomatoButton
      </TomatoButton>
    </div>
  )
}

export default StyledComponents
