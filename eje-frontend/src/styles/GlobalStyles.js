import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    width: 100%;
    min-height: 100vh;
    background: rgb(25, 34, 63);
    overflow-x: hidden;
  }
`;
