import styled, { keyframes } from 'styled-components';

export const HomeBlockTwoWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 10rem auto;

    & > p {
        font-size: 2rem;
        max-width: 80rem;
        text-align: center;
    }
`;

export const CardWrapper = styled.div`
    display: grid;
    gap: 5rem;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 15rem;
`

export const Card = styled.div`
    position: relative;
    background: ${props => props.theme.colors.white};
    height: 30rem;
    width: 40rem;
    border-radius: 2rem;
    padding: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(63, 63, 63, 0.02);
    transition: 0.5s;
    border: 3px solid ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};

    :hover {
        transition: 0.5s ease-in-out;
        transform: scale(1.04);
        border-color: ${props => props.theme.colors.orange};
    }

    .icon {
        width: 7rem;
        height: 7rem;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10rem;
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.white};
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            font-size: 4rem;
        }
    }
`

export const IntroWrapper = styled.div`
    background: ${props => props.theme.colors.primary};
    display: grid;
    gap: 7rem;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 15rem;
    padding: 20rem;
    clip-path: polygon(0 0, 100% 4%, 100% 100%, 0 96%);

    div {
        color: ${props => props.theme.colors.white};
        max-width: 70rem;
        margin: 0 auto;

        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;

            svg {
                margin-right: 2rem;
            }
        }

        p {
            font-size: 2rem;
        }
    }
`

export const DashWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10rem 0;
    border-bottom: 5px dashed #ddd;

    & > div:first-child {
        text-align: center;
        h1 {
            font-size: 4rem;
            color: ${props => props.theme.colors.primary};
        }

        p {
            font-size: 2rem;
            max-width: 70rem;
            color: #777;
        }
    }

    & > div:last-child {
        position: relative;
        width: 140rem;
        height: 90rem;
        margin-top: 8rem;

        img {
            object-fit: contain;
        }
    }
`

export const CardService = styled.div`
    display: grid;
    gap: 8rem;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    margin-top: 5rem;

    & > div {
        h2 {
            font-size: 5rem;
            text-transform: capitalize;
            letter-spacing: -0.2rem;
            margin-bottom: 2rem;
            font-weight: 700;
            color: ${props => props.theme.colors.primary};
        }

        p {
            font-size: 2rem;
            max-width: 60rem;
        }
    }

    img {
        object-fit: contain;
    }
`

export const ServicesWrapper = styled.div`
    margin-top: 10rem;
    width: 100%;
    max-width: 140rem;
`
export const ServicesTopics = styled.div`
    display: grid;
    gap: 4rem;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));

    & > div {
        padding: 4rem;
        border-radius: 2rem;
        background: ${props => props.theme.colors.white};
        max-width: 45rem;

        .perfil {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin-top: 2rem;

            img {
                object-fit: cover;
                border-radius: 100%;
            }

            strong {
                font-weight: 500;
            }
        }

    }
`