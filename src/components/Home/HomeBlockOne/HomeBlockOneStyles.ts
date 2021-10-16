import styled, { keyframes } from 'styled-components';

const animateDiv = keyframes`
 from { border-top-left-radius: 50%; border-bottom-left-radius: 80%; }
`

export const HomeBlockOneWrapper = styled.section`
    position: relative;
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 8rem;
    grid-template-columns: repeat(2, 1fr);

    height: 100vh;
    width: 100%;
    margin-bottom: 10rem;

    div:first-child {
        padding-left: 7rem;
    }

    div:first-child form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        max-width: 50rem;

        input {
            padding: 1rem 2rem;
            border: none;
            background: #fff;
            font-size: 2rem;
        }
    }

    .ilustration {
        width: 100%;
        height: 100%;
        border-top-left-radius: 100%;
        border-bottom-left-radius: 100%;
        background: ${props => props.theme.colors.primary_light};
        padding: 0 10rem;
        animation: ${animateDiv} 5s ease-in-out infinite alternate;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .social {
            position: absolute;
            right: 5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;

            svg {
                font-size: 3rem;
                color:  ${props => props.theme.colors.white};
            }
        }

        .photos-wrapper {
            position: relative;
            width: 60rem;
            height: 60rem;
        }

    }

    h1 {
        font-size: 4.5rem;
        background-clip: text;
        background-image: linear-gradient(to left, #e07a5f, #ea5923);
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
        background: ${props => props.theme.colors.primary};
        font-size: 2rem;
        font-weight: 600;
        transition: 0.5s;
        border-radius: 10rem;

        :hover {
            letter-spacing: 0.2rem;
            transition: 0.5s;
            cursor: pointer;
        }
    }
`;