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
        background: #f7f8fa;
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
        border-top: 1.5px solid #ccc;
        padding-top: 3rem;
        margin-bottom: 4rem;

        h1 {
            font-size: 3rem;
            font-weight: 500;
        }

        p {
            font-size: 2rem;
            color: ${props => props.theme.fonts_color.dark1};
        }

        .select-item {
            cursor: pointer;
            transition: 0.5s;
            border: 2px solid #ccc;
            padding: 0rem 1rem;
            height: 4rem;
            width: 23rem;
            display: flex;
            align-items: center;
            border-radius: 0.5rem;
            
            select {
                cursor: pointer;
                padding: 1rem;
                width: 100%;
                outline: none;
                border: none;
                background: transparent;
                appearance: none;
            }
        }

        .filters-wrapper {
            display: flex;
            align-items: center;
            gap: 2rem;

            input {
                max-width: 25rem;
                padding: 0.5rem 1rem;
                height: 4rem;
                background: transparent;
                border: 2px solid #ccc;
                outline: none;
                border-radius: 0.5rem;
            }
        }
    }

    .btn-close-modal {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
        background: ${props => props.theme.colors.primary};
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
        background: ${props => props.theme.colors.white};
        box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);

        display: none;
        flex-direction: column;
        width: fit-content;

        span {
            padding: 1rem 2rem;
            white-space: nowrap;
            width: fit-content;

            :hover {
                color: ${props => props.theme.colors.white};
                cursor: pointer;
                background: ${props => props.theme.colors.primary};
            }
        }
    }
`