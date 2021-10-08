import styled from 'styled-components';

export const HomeBlockFourWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #645BDE;
    padding: 4rem 0;

    div {
        max-width: 50%;
    }

    div.intro {
        h1 {
            color: #fff;
            font-size: 3.5rem;
        }

        p {
            color: #fff;
            font-size: 1.6rem;
            margin-top: 2rem;
        }
    }
`;

export const Newsletter = styled.div`
    display: flex;
    gap: 5.8rem;
    align-items: flex-end;
    margin-top: 5rem;

    div {
        h1 {
            color: #fff;
            font-size: 2.5rem;
        }

        p {
            color: #fff;
            font-size: 1.4rem;
            margin-top: 1rem;
        }
    }

    form {
        display: flex;
        gap: 2rem;

        input {
            border: none;
            outline: none;
            border-bottom: 1px solid #fff;
            background: transparent;
            color: #fff;

            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #fff;
                opacity: 1; /* Firefox */
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: #fff;
            }

            ::-ms-input-placeholder { /* Microsoft Edge */
                color: #fff;
            }
        }

        button {
            padding: 0.5rem 2rem;
            white-space: nowrap;
            cursor: pointer;
            border: none;
            outline: none;
            border-radius: 10rem;
        }
    } 
`