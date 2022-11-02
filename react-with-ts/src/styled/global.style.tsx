import { createGlobalStyle } from 'styled-components'
// 全局样式
export const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;

    .debug-r {
      outline: 2px solid #f00;
    }

    body {
      background: pink;
    }
  }
`
