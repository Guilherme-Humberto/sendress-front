import styled, { css } from 'styled-components';

interface ModalProps {
    send?: boolean
    create?: boolean
}

export const CampaignsWrapper = styled.section`
    width: 100%;
`;

export const SendButton = styled.div`
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    background: #645BDE;
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    z-index: 99;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.2);

    svg {
        color: #fff;
        font-size: 3rem;
    }
`

export const CampaignForm = styled.div<ModalProps>`
    display: grid;
    grid-template-columns: 40rem 1fr;
    gap: 1rem;

    h1 {
        font-size: clamp(2rem, 2.5vw, 3rem);
        font-weight: 600;
    }

    p {
        font-size: 1.8rem;
        max-width: 80%;
    }

    ${props => props.send && css`
        div.intro {
            background: #645BDE;
            padding: 4rem;
            color: #fff;
            clip-path: polygon(0 0, 100% 0, 94% 100%, 0% 100%);

            h1 {
                font-size: 4rem;
                font-weight: 700;
            }
        }

        div.form-wrapper {
            padding: 4rem;
        }
        height: 100vh;

        form {
            display: flex;
            flex-direction: column;
            margin-top: 7rem;

            label {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                margin: 2rem 0;
                font-size: 1.7rem;

                button {
                    background: #e8e8e8;
                    border: none;
                    outline: none;
                    font-size: 1.4rem;
                    border-radius: 10rem;
                    color: #222;
                    font-weight: 500;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;

                    svg {
                        font-size: 2rem;
                    }
                }
            }

            select {
                padding: 1rem 2rem;
            }

            button {
                margin-top: 2rem;
                padding: 1rem 2rem;
                background: #645BDE;
                border: none;
                outline: none;
                font-size: 1.8rem;
                border-radius: 0.4rem;
                color: #fff;
                font-weight: 500;
                transition: 0.5s;
                width: fit-content;
            }
        }
    `}

    ${props => props.create && css`
        div.intro {
            background: #645BDE;
            padding: 4rem;
            color: #fff;
            clip-path: polygon(0 0, 100% 0, 94% 100%, 0% 100%);

            h1 {
                font-size: 4rem;
            }
        }

        div.form-wrapper {
            padding: 4rem;
        }

        form {
            display: flex;
            flex-direction: column;
            margin-top: 2rem;

            label {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                margin: 2rem 0;
                font-size: 1.7rem;

                button {
                    background: #e8e8e8;
                    border: none;
                    outline: none;
                    font-size: 1.4rem;
                    border-radius: 10rem;
                    color: #222;
                    font-weight: 500;
                    padding: 0.5rem 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.2rem;

                    svg {
                        font-size: 2rem;
                    }
                }
            }

            input,
            select {
                padding: 1rem 2rem;
            }

            .btn-use-template {
                margin-top: 1rem;
                cursor: pointer;
                color: #645BDE;
            }

            button[type="submit"] {
                padding: 1rem 2rem;
                background: #645BDE;
                border: none;
                outline: none;
                font-size: 1.8rem;
                border-radius: 0.4rem;
                color: #fff;
                font-weight: 500;
                transition: 0.5s;
                width: fit-content;
                margin-top: 1.5rem;

                :hover {
                    cursor: pointer;
                    transition: 0.5s;
                    background: ${props => props.theme.colors.font};
                }
            }

            .ql-container {
                height: 100%;
            }
        }
    `}
`