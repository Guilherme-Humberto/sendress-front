import styled, { css } from 'styled-components';

export const MenuLeftWrapper = styled.div<{ changeMenu?: boolean }>`
    position: relative;
    background: #fff;
    width: ${props => props.changeMenu ? '10rem' : '30rem'};
    transition: 0.7s;
    min-height: 100vh;

    .logo-wrapper {
        background: #645BDE;
        padding: 1rem 2rem;
        color: #fff;
        
        h1 {
            font-weight: 600;
            text-transform: uppercase;

            small {
                font-size: 1.1rem;
                font-weight: 400;
            }
        }

        .logo-icon {
            font-size: 2rem;
            margin-left: 1.5rem;
            transform: rotate(45deg);
        }

        ${props => props.changeMenu && css`
            text-align: center;
        `}
    }

    .geral-navs {
        display: flex;
        flex-direction: column;
        gap: 3rem;
        margin-top: 5rem;

        ${props => props.changeMenu && css`
            gap: 4rem;
        `}

        & > a:first-child {
            position: relative;
        }
    }

    .sec-title {
        margin: 0 2rem;
        font-size: 1.7rem;
        font-weight: 500;
        color: #504E4E;
        transition: 0.5s;

        ${props => props.changeMenu && css`
            display: none;
        `};
    }

    .change-menu-btn {
        position: absolute;
        bottom: 4rem;
        right: -2.5rem;
        width: 5rem;
        height: 5rem;
        border-radius: 10rem;
        background: ${props => props.theme.colors.main_color};
        border: none;
        outline: none;
        color: ${props => props.theme.colors.white};
        box-shadow: 0 20px 30px rgb(0, 0, 0, 0.2);
        font-size: 2.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;

export const LinkMenu = styled.a<{ active?: boolean, showLink?: boolean }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: ${props => props.showLink ? '3rem' : '2rem'}; 
    color: ${props => props.theme.colors.font};
    transition: 0.5s;
    font-size: clamp(1rem, 2.5vw, 1.6rem); 

    svg {
        font-size: 2.5rem;
    }

    ${props => props.active && css`
        transition: 0.5s;
        border-left: 4px solid ${props => props.theme.colors.main_color};
        color: ${props => props.theme.colors.main_color};
        font-weight: 600;
    `};

    .link-intro-wrapper {
        display: none;

        ${props => props.showLink && css`
            opacity: 0;
            transition: 0.5s;
            display: flex;
            position: absolute;
            right: -100%;
            transform: translateX(100px);
            z-index: 99;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            font-weight: 500;
            color: ${props => props.theme.colors.font};
            background: ${props => props.theme.colors.white};
            border-left: 3px solid ${props => props.theme.colors.main_color};
        `}; 
    }

    :hover .link-intro-wrapper{
            opacity: 1;
            transition: 0.5s;
    }


    .link-title {
        display: ${props => props.showLink ? 'none' : 'flex'}; 
    }
`