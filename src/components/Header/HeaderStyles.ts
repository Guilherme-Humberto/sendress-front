import styled from 'styled-components';

export const HeaderWrapper = styled.header<{ changeColor?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 2rem 10rem;
    z-index: 99;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    transition: 0.5s;
    background: ${props => props.changeColor ? props.theme.colors.primary : 'transparent'};
    
    nav {
        display: flex;
        align-items: center;
        gap: 5rem;

        h2 {
            font-size: 2.5rem;
            font-weight: 300;
            color: ${props => props.theme.colors.white};
        }

        .links-list {
            display: flex;
            align-items: center;
            gap: 2rem;

            a {
                font-size: 1.8rem;
                font-weight: 500;
                color: ${props => props.theme.colors.white};
            }
        }

        @media (max-width: 700px) {
            .links-list {
                display: none;
            }
        }
    }

    div:last-child {
        button:first-child {
            background: transparent;
            color: ${props => props.theme.colors.white};
            border: 2px solid ${props => props.theme.colors.white};
            transition: 0.5s;

            :hover {
                cursor: pointer;
                transition: 0.5s;
                border-color: ${props => props.theme.colors.primary_light};
                color: ${props => props.theme.colors.white};
                background: ${props => props.theme.colors.primary_light};
            }
        }

        button {
            margin-right: 1rem;
            padding: 0.4rem 2rem;
            background: ${props => props.theme.colors.white};
            border-color: transparent;
            outline: none;
            transition: 0.5s;
            font-size: 1.8rem;
            font-weight: 600;
            text-transform: capitalize;

            :hover {
                cursor: pointer;
                transition: 0.5s;
                color: ${props => props.theme.colors.white};
                background: #444;
            }
        }
    }

    @media (max-width: 700px) {
        padding: 2rem;
    }
`;
