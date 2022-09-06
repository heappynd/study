import React from 'react'
import styled from 'styled-components'

interface PProps {
  readonly bg: string
}

const StyledFooter = styled.footer`
  background: yellow;
`
const StyledP = styled.p<PProps>`
  background: ${(props) => props.bg};
  height: 100px;
  width: 100px;
`

export default function Styled() {
  return (
    <div>
      <StyledFooter>Styled</StyledFooter>

      <StyledP bg="purple">jaksjdkasl</StyledP>
    </div>
  )
}
