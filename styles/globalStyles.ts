import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 62.5%;
    }
    body {
        min-height: 100vh;
        background: #f5f3f0;
    }
    body,
    input,
    button,
    textarea,
    select {
        font-family: ${props => props.theme.fonts.primary};
        font-weight: 400;
        font-size: 1.6rem;
        color: ${props => props.theme.colors.font};
    }
    img {
        display: block;
    }
    ul {
        list-style: none;
    }
    a,
    a:link,
    a:visited {
        text-decoration: none;
    }
    .constraint {
        max-width: 1700px;
        margin: 0 auto;
    }

    .content-top {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin: 3rem 0;

        h1 {
            font-size: 3rem;
        }

        p {
            font-size: 2rem;
            color: ${props => props.theme.fonts_color.dark1};
        }

        .select-item {
            background: #fff;
            cursor: pointer;
            transition: 0.5s;
            border: 2px solid #fff;
            padding: 0rem 1rem;
            width: 23rem;
            display: flex;
            align-items: center;
            border-radius: 1rem;
            
            select {
                cursor: pointer;
                padding: 1rem;
                width: 100%;
                outline: none;
                border: none;
                background: transparent;
                appearance: none;
            }

            :hover {
                transform: scale(1.1);
            }
        }
    }

    .btn-close-modal {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        background: ${props => props.theme.colors.main_color};
        width: 6rem;
        height: 6rem;
        border-radius: 10rem;
        z-index: 99;
        cursor: pointer;
        border: none;
        outline: none;

        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 20px rgb(0, 0, 0, 0.2);

        svg {
            color: #fff;
            font-size: 3rem;
        }
    }

    .without-leads-msg {
        display: flex;
        flex-direction: column;
        margin-top: 10rem;
        border-radius: 1rem;
        padding: 5rem 3rem;
        border: 2px dashed #b4b2bd;

        h1 {
            font-size: 2.5rem;
            font-weight: 600;
            color: #888;
        }

        strong {
            font-size: 2rem;
            font-weight: 500;
            color: #888;
            cursor: pointer;
        }
    }

    .error-msg {
        margin-top: 1rem;
        font-weight: 600;
        color: salmon;
    }

    .modal-actions {
        position: absolute;
        z-index: 3;
        top: 100%;
        background: #fff;
        box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);

        display: none;
        flex-direction: column;
        width: fit-content;

        span {
            padding: 1rem 2rem;
            width: 14rem;

            :hover {
                color: #fff;
                cursor: pointer;
                background: ${props => props.theme.colors.main_color};
            }
        }
    }
`