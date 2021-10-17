import styled, { css } from 'styled-components';

export const HomeBlockThreeWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 180rem;
    height: 100vh;

    .intro {
        text-align: center;
        margin-bottom: 5rem;

        h1 {
            font-size: 5rem;
            color: ${props => props.theme.colors.primary_dark};
        }

        p {
            font-size: 2.5rem;
            font-weight: 300;
            max-width: 60rem;
            margin: 0 auto;
            color: ${props => props.theme.fonts_color.dark1};
        }
    }
`;

export const PaymentsList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
`
export const Card = styled.div<{ noColor: boolean }>`
    width: 50rem;
    min-height: 40rem;
    padding: 4rem;
    border-radius: 1rem;
    box-shadow: 0 20px 30px rgb(0, 0, 0, 0.09);
    color: ${props => props.theme.colors.font};
    background: #fff;
    border: 2px solid ${props => !props.noColor ? props.theme.colors.primary_dark : '#fff'};

    .price {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .product-name {
            font-size: 2rem;
            font-weight: 900;
        }

        .product-price {
            font-size: 3rem;
        }
    }

    .description {
        font-size: 1.8rem;
        margin: 0.2rem 0 2rem 0;
    }

    ul {
        padding-left: 2rem;
    }

    ul li {
        font-size: 1.6rem;
        font-weight: 300;
        white-space: nowrap;
        list-style: disc;
    }

    button {
        width: 100%;
        margin: 3rem 0;
        padding: 1rem 0;
        font-size: 2rem;
        font-weight: 600;
        border: none;
        cursor: pointer;
        color: ${props => props.noColor ? props.theme.colors.primary_dark : '#fff'};
        background: ${props => !props.noColor ? props.theme.colors.primary_dark : '#fff'};
        border: 2px solid ${props => props.noColor ? props.theme.colors.primary_dark : '#fff'};
    }

    transition: 0.5s;

    :hover {
        transition: 0.5s;
        transform: scale(1.03);
    }
`