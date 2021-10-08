import styled from 'styled-components';

export const ConfirmWrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;

  div {
      max-width: 90rem;
      h1 {
          font-size: 4rem;
          color: #645BDE;
          margin-top: 4rem;
      }

      p {
          font-size: 2.2rem;
          color: ${props => props.theme.fonts_color.dark1};
          padding: 2rem 0;
      }

      svg {
          width: 70rem;
      }

      button {
          padding: 1rem 2rem;
          color: #fff;
          border: none;
          margin-top: 2rem;
          outline: none;
          font-weight: 600;
          background: #645BDE;
          border-radius: 100rem;
          cursor: pointer;
          font-size: 2rem;
          transition: 0.5s;
          box-shadow: 0 20px 30px rgb(0, 0, 0, 0.1);

          :hover {
              transition: 0.5s;
              background: ${props => props.theme.colors.font};
          }
      }
  }
`;
