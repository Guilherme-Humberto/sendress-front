import styled, { keyframes } from 'styled-components';

export const HomeBlockTwoWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 10rem auto;

    & > p {
        font-size: clamp(0.4rem, 4vw, 2rem);
        max-width: 80rem;
        text-align: center;
        padding: 0 2rem;
    }
`;

export const CardWrapper = styled.div`
    display: grid;
    gap: 5rem;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    margin-top: 15rem;
    padding: 0 2rem;
    width: 100%;
    max-width: 140rem;
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
        border-color: ${props => props.theme.colors.primary};
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

    @media (max-width: 700px) {
        width: 100%;
    }
`

export const IntroWrapper = styled.div`
    background: ${props => props.theme.colors.primary};
    display: grid;
    gap: 7rem;
    grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
    align-items: flex-start;
    justify-items: center;
    width: 100%;
    margin-top: 15rem;
    padding: 20rem;
    clip-path: polygon(0 0, 100% 4%, 100% 100%, 0 96%);

    div {
        color: ${props => props.theme.colors.white};
        max-width: 70rem;
        margin: 0 auto;

        h1 {
            font-size: clamp(2.2rem, 4vw, 3rem);
            margin-bottom: 1rem;
            white-space: nowrap;

            svg {
                margin-right: 2rem;
            }
        }

        p {
            font-size: clamp(1.6rem, 4vw, 2rem);
        }
    }

    @media (max-width: 1000px) {
        padding: 10rem 3rem;
        grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
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
            font-size: clamp(3rem, 4vw, 4rem);
            color: ${props => props.theme.colors.primary};
        }

        p {
            font-size: clamp(1.4rem, 4vw, 2rem);
            max-width: 70rem;
            color: #777;
        }
    }

    & > div:last-child {
        position: relative;
        width: 100%;
        height: 60rem;
        margin-top: 8rem;

        img {
            object-fit: contain;
        }

        @media (max-width: 730px) {
            height: 40rem;
        }
    }

    @media (max-width: 550px) {
        ul {
            margin-top: 2rem;
            width: 100%;
            padding-left: 2rem;
            list-style: disc;

            li {
                margin-left: 2rem;
            }
        }

        & > div:first-child {
            text-align: left;
            padding-left: 2rem;
        }
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
    justify-items: center;
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