import styled from 'styled-components';

export const HomeBlockOneWrapper = styled.section`
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 8rem;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 7rem;

    height: 100vh;
    width: 100%;

    div:first-child form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 50rem;

        input {
            padding: 1rem 2rem;
            border: none;
            background: #edf2f7;
            font-size: 2rem;
        }
    }

    h1 {
        font-size: 4.5rem;
        background-clip: text;
        background-image: linear-gradient(to left, rgb(75, 63, 145), rgb(163, 20, 98));
        -webkit-background-clip: text;
        color: rgba(0,0,0,.2);
    }

    p.text-intro {
        font-size: 2rem;
        margin: 2rem 0;
    }

    button {
        padding: 1.5rem 5rem;
        border: none;
        outline: none;
        cursor: pointer;
        width: fit-content;
        box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);
        color: ${props => props.theme.colors.white};
        background-image: linear-gradient(to left, rgb(75, 63, 145), rgb(163, 20, 98));
        font-size: 2rem;
        font-weight: 600;
        transition: 0.5s;

        :hover {
            letter-spacing: 0.2rem;
            transition: 0.5s;
            cursor: pointer;
        }
    }
`;