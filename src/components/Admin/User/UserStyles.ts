import styled, { css } from 'styled-components';

export const UserWrapper = styled.section`
  display: grid;
  grid-template-columns: 30rem 1fr;
  border-top: 1px solid #ccc;
  padding-top: 3rem;
`;

export const MenuUserTab = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;

    h1 {
        font-size: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 500;

        svg {
            font-size: 2.5rem;
        }
    }
`

export const TabTitle = styled.h1<{ tabActive?: boolean }>`
    cursor: pointer;
    font-weight: 300 !important;
    transition: 0.5s;
    
    ${props => props.tabActive && css`
        font-weight: 500 !important;
        transition: 0.5s;
        padding-left: 1rem;
        border-left: 3.5px solid ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    `}
`

export const MenuUserCenter = styled.div`
    padding: 4rem;
    height: 100%;

    .infos-wrapper .user-name {
        font-size: 4rem;
        font-weight: 600;
        color: ${props => props.theme.colors.primary};
    }

    form {
        margin-top: 3rem;
    }

    form .flex {
        display: flex;
        gap: 3rem;
        width: 100%;

        div {
            width: 100%;
        }
    }

    form label {
        font-size: 1.8rem;
        margin-bottom: 1rem;
    }

    form button {
        margin-top: 2rem;
        padding: 1rem 2rem;
        font-size: 2rem;
        font-weight: 600;
        border: none;
        outline: none;
        cursor: pointer;
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.primary};
    }

    .subs-wrapper img {
        height: 30rem;
    }

    .subs-wrapper .product-name {
        font-size: 4.7rem;
        font-weight: 500;
        color: ${props => props.theme.colors.primary};
    }

    .subs-wrapper .product-desc {
        margin: 2rem 0;
        font-size: 2rem;
    }

    .subs-wrapper .product-period-start,
    .subs-wrapper .product-period-end {
        font-weight: 500;
        font-size: 1.8rem;
    }

    .subs-wrapper .product-price {
        margin-top: 2rem;
        font-size: 3rem;
        font-weight: 600;
        color: ${props => props.theme.colors.primary};
    }

    .subs-wrapper .plan-actions {
        margin-top: 4rem;
        display: flex;
        align-items: center;
        gap: 2rem;

        span {
            background: ${props => props.theme.colors.primary};
            font-weight: 600;
            padding: 1rem 2rem;
            cursor: pointer;
            transition: 0.5s;
            color: ${props => props.theme.colors.white};

            :hover {
                transition: 0.5s;
                color: ${props => props.theme.colors.white};
                background: ${props => props.theme.colors.font};
                border-color: ${props => props.theme.colors.font};
            }
        }
    }

    .subs-wrapper .plan-default-title {
        font-weight: 400;
        margin-bottom: 1rem;
        padding-top: 2rem;
        border-top: 2px dashed #eee;
        color: ${props => props.theme.colors.primary};
    }

    .subs-wrapper .cancel-subscription-title {
        width: min(50rem, 100%)
    }
`