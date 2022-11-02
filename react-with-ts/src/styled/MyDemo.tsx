import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const MyButton = styled.a`
  border: 1px solid #00f;
  border-radius: 4px;
  padding: 4px 16px;
  cursor: pointer;
  font-size: ${(props) => props.size || 'auto'};

  & span {
    font-weight: 700;
    color: #ff0;
  }

  &:hover {
    background: #0ff;
  }

  & ~ & {
    /* mybutton 前面还有 mybutton */
    margin-left: 8px;
  }

  &.red {
    border: 1px solid red;
  }

  ${(props) =>
    props.disabled &&
    css`
      color: #777;
      border: #777;
      cursor: not-allowed;
    `}
`
// 继承
const BigButton = styled(MyButton)`
  font-size: 32px;
`

// 动画
const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`

const Rotate = styled.div`
  animation: ${rotate} 2s linear infinite;
`

const MyDemo = () => {
  return (
    <div>
      <MyButton>hello</MyButton>
      <MyButton size="56px">hello</MyButton>
      <MyButton disabled>hello</MyButton>

      <BigButton disabled>hello</BigButton>

      <Rotate>R</Rotate>
    </div>
  )
}

export default MyDemo
