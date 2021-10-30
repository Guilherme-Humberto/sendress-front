import { createGlobalStyle, keyframes } from 'styled-components'

const rotateAnimation = keyframes`
    from { transform: rotate(360deg) }
`

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

    .is-loading-wrapper {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        img {
            font-size: 4rem;
            animation: ${rotateAnimation} 1s linear infinite;
            color: ${props => props.theme.colors.primary};
        }
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
            font-weight: bold;
            color: ${props => props.theme.colors.font};

            small {
                font-weight: 300;
                font-size: 2rem;
                margin-left: 1rem;
            }
        }

        p {
            font-size: 2rem;
            color: ${props => props.theme.fonts_color.dark1};
        }

        .select-item {
            cursor: pointer;
            transition: 0.5s;
            padding: 0rem 1rem;
            height: 4rem;
            width: 13rem;
            display: flex;
            align-items: center;
            border-radius: 0.5rem;
            background: ${props => props.theme.colors.white};
            border: none;
            
            select {
                cursor: pointer;
                padding: 1rem;
                width: 100%;
                outline: none;
                border: none;
                appearance: none;
                background: transparent;
            }
        }

        .filters-wrapper {
            display: flex;
            align-items: center;
            gap: 2rem;

            .input-search-wrapper {
                display: flex;
                align-items: center;
                background: ${props => props.theme.colors.white};
                max-width: 25rem;
                border-radius: 0.5rem;

                svg {
                    font-size: 2rem;
                    margin-left: 1rem;
                }
            }
            input {
                padding: 0.5rem 1rem;
                height: 4rem;
                border: none;
                width: 100%;
                outline: none;
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

    .editor-page-wrapper {
        display: flex;

        .editor-page-wrapper-intro.disabled {
            background: ${props => props.theme.colors.white};
            width: 0rem;
            transition: .5s;
            border-right: 3px dashed #F0F1F8;
        }

        .editor-page-wrapper-intro {
            padding: 3rem;
            width: 40rem;
            position: relative;
            transition: .5s;
        }

        .editor-page-wrapper-link {
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${props => props.theme.colors.font};
            margin-bottom: 3rem;

            svg {
                font-size: 2.3rem;
            }
        }

        .editor-page-wrapper-btn-float {
            position: absolute;
            z-index: 2;
            bottom: 0;
            left: 100%;
            transform: translate(-50%, -50%);
            width: 4.4rem;
            height: 4.4rem;
            border-radius: 10rem;
            background: ${props => props.theme.colors.primary};

            display: flex;
            align-items: center;
            justify-content: center;
            color: ${props => props.theme.colors.white};
            border: none;
            outline: none;
            cursor: pointer;
            transition: 0.5s;

            svg {
                font-size: 2.5rem;
            }

            :hover {
                transition: 0.5s;
                color: ${props => props.theme.colors.white};
                background: ${props => props.theme.colors.font};
            }
        }

        .template-form {
            margin-top: 5rem;

            input {
                width: 100%;
                padding: 0.5rem 1rem;
                border: 2px solid #eee;
                outline: none;
                margin-bottom: 3rem;
            }

            textarea {
                padding: 1rem;
                outline: none;
                border: 2px solid #eee;
                height: 20rem;
                max-width: 30rem;
            }

            button {
                width: 100%;
                margin-top: 1rem;
                outline: none;
                border: none;
                height: 4rem;
                color: ${props => props.theme.colors.white};
                background: ${props => props.theme.colors.primary};
            }
        }
    }
`