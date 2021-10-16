import styled, { keyframes } from 'styled-components';

export const HomeBlockTwoWrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 20rem auto;

    & > h1 {
        font-size: 4rem;
        color: ${props => props.theme.colors.primary_dark};
    }

    & > p {
        font-size: 2rem;
        max-width: 60rem;
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

    :hover {
        transition: 0.5s;
        transform: translateY(-1rem);
        border-color: ${props => props.theme.colors.primary_dark};
    }

    .icon {
        width: 7rem;
        height: 7rem;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10rem;
        background: ${props => props.theme.colors.primary_dark};
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
    background: linear-gradient(90.02deg, #E07A5F 8.62%, #F09F5A 92.77%);
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
    }
`

export const DashWrapper = styled.div``

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