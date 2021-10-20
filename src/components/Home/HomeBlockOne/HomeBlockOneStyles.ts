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
    grid-template-columns: 1fr;

    height: 100vh;
    width: 100%;
    margin-bottom: 10rem;
    background-size: cover;
    background-attachment: fixed;
    background-image: linear-gradient(rgb(0, 0, 0, 0.35), rgb(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/3894383/pexels-photo-3894383.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260");

    div:first-child {
        padding: 0rem 2rem;
    }

    div:first-child form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin: 2rem auto;

        input {
            padding: 1rem 2rem;
            border: none;
            background: ${props => props.theme.colors.white};
            font-size: 1.6rem;
            outline: none;
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
        }

        button {
            padding: 1rem 2rem;
            border: none;
            outline: none;
            cursor: pointer;
            width: fit-content;
            box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);
            color: ${props => props.theme.colors.white};
            background: ${props => props.theme.colors.primary};
            font-size: 1.6rem;
            font-weight: 600;
            transition: 0.5s;
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;

            :hover {
                letter-spacing: 0.2rem;
                transition: 0.5s;
                cursor: pointer;
            }
        }

    }
    
    h1 {
        font-size: clamp(2.8rem, 5vw, 5.5rem);
        max-width: 90rem;
        text-align: center;
        line-height: 7rem;
        color: ${props => props.theme.colors.white};
    }

    p.text-intro {
        max-width: 80rem;
        text-align: center;
        font-weight: 300;
        font-size: clamp(0.4rem, 4vw, 2.2rem);
        margin: 2rem 0;
        color: ${props => props.theme.colors.white};
    }
    
    @media (max-width: 700px) {
        div:first-child form {
            flex-direction: column;
    
            button {
                width: 100%;
                margin-top: 1.4rem;
                border-radius: 0.5rem;
            }
    
            input {
                border-radius: 0.5rem;
            }
        }

        h1,
        p.text-intro {
            text-align: left;
        }

        h1 {
            line-height: 4rem;
        }

        p {
            line-height: 2.5rem;
        }
        
    }

    .message-text {
        display: flex;
        justify-content: center;
        color: ${props => props.theme.colors.white};
    }
`;