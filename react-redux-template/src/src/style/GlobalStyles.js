import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';

const textStyles = css`
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 40px;
  }
  p {
    font-size: 20px;
  }
`;

export default createGlobalStyle`
  body {
    background: gray;
    padding-left: 30px;
  }

  ${normalize};
  ${textStyles};
`;
