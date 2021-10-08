import styled from 'styled-components';

export const SendersWrapper = styled.section`
    width: 100%;
`;

export const SenderForm = styled.div`
    display: grid;
    grid-template-columns: 40rem 1fr;
    gap: 1rem;

    h1 {
        font-size: clamp(2rem, 2.5vw, 3rem);
        font-weight: 600;
    }

    p {
        font-size: 1.8rem;
        max-width: 80%;
    }

    div.intro {
        background: #645BDE;
        padding: 4rem;
        color: #fff;
        height: 100vh;
        clip-path: polygon(0 0, 100% 0, 94% 100%, 0% 100%);

        h1 {
            font-size: 4rem;
        }
    }

    div.form-wrapper {
        padding: 4rem;
    }

    form {
        label {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin: 2rem 0;
            font-size: 1.7rem;
        }
        
        button {
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: #645BDE;
            border: none;
            outline: none;
            font-size: 1.8rem;
            border-radius: 0.4rem;
            color: #fff;
            font-weight: 500;
            transition: 0.5s;
            width: fit-content;

            :hover {
                cursor: pointer;
                transition: 0.5s;
                color: #fff;
                background: ${props => props.theme.colors.font};
            }
        }
    }
`