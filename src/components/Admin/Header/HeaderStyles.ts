import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0 4rem 0;

  div {
      width: 100%;
  }

  div:nth-child(1) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .user-name {
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: -1px;
        color: ${props => props.theme.colors.primary}
      }
  }

  div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      svg {
        font-size: 2.3rem;
        margin-right: 2rem;
        cursor: pointer;
      }

      .form-search {
          display: flex;
          align-items: center;
          border-radius: 0.3rem;
          padding-left: 1rem;
          margin-right: 1rem;
          border: 1px solid ${props => props.theme.colors.font};

          svg {
              font-size: 2rem;
              color: ${props => props.theme.colors.font};
          }
          input {
              padding: 0.8rem 0;
              background: transparent;
              border: none;
              outline: none;

            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #222;
                opacity: 1; /* Firefox */
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #222;
            }

            ::-ms-input-placeholder { /* Microsoft Edge */
                color: #222;
            }
          }
      }
  }
`;