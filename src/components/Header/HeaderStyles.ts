import styled from 'styled-components';

export const HeaderWrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 2rem 10rem;
    background: #fff;
    z-index: 99;

    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
        display: flex;
        align-items: center;
        gap: 5rem;

        svg {
            width: 10rem;
        }

        .links-list {
            display: flex;
            align-items: center;
            gap: 2rem;

            a {
                font-size: 1.8rem;
                font-weight: 500;
                color: ${props => props.theme.colors.font};

                :hover {
                    color: ${props => props.theme.colors.main_color};
                }
            }
        }
    }

    div:last-child {
        button:first-child {
            background: transparent;
            color: ${props => props.theme.colors.main_color};
            border: 2px solid ${props => props.theme.colors.main_color};
            transition: 0.5s;

            :hover {
                cursor: pointer;
                transition: 0.5s;
                border-color: ${props => props.theme.colors.main_color};
                color: ${props => props.theme.fonts_color.white};
                background: ${props => props.theme.colors.main_color};
            }
        }

        button {
            margin-right: 1rem;
            padding: 0.4rem 2rem;
            color: ${props => props.theme.fonts_color.white};
            background: ${props => props.theme.colors.main_color};
            border-color: transparent;
            outline: none;
            border-radius: 10rem;
            font-weight: 600;
            transition: 0.5s;

            :hover {
                cursor: pointer;
                transition: 0.5s;
                background: ${props => props.theme.colors.main_color};
            }
        }
    }
`;
