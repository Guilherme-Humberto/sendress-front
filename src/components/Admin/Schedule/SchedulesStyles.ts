import styled from 'styled-components';

export const SchedulesWrapper = styled.section``;

export const ScheduleList = styled.div`
    display: grid;
    gap: 6rem;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));

    & > div {
        width: 35rem;
        height: 25rem;
        background: ${props => props.theme.colors.white};
    }
`

export const ScheduleButton = styled.button`
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    background: ${props => props.theme.colors.primary};
    width: 6rem;
    height: 6rem;
    border-radius: 10rem;
    z-index: 99;
    cursor: pointer;
    outline: none;
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.2);

    svg {
        color: #fff;
        font-size: 3rem;
    }
`

export const ScheduleForm = styled.div`
    .modal-title {
        font-size: 3rem;
        color: ${props => props.theme.colors.primary};
    }

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
                    background: ${props => props.theme.colors.primary};
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
                border-radius: 10rem;
                background: transparent;
                background: transparent;
                appearance: none;
                -moz-appearance: none;
                outline: none;
                border: 1px solid ${props => props.theme.fonts_color.dark1};

                :focus {
                    border: 2px solid ${props => props.theme.colors.primary_light};
                }
            }

            button {
                margin-top: 2rem;
                padding: 1rem 2rem;
                background: ${props => props.theme.colors.primary};
                border: none;
                outline: none;
                font-size: 1.8rem;
                border-radius: 0.4rem;
                color: ${props => props.theme.colors.white};
                font-weight: 500;
                transition: 0.5s;
                width: fit-content;
                cursor: pointer;
            }

            .dates-list {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 2rem;
                margin-top: 2rem;

                span {
                    font-family: monospace;
                    font-size: 1.4rem;
                    font-weight: 500;
                    padding: 0.4rem 1rem;
                    background: #F0F1F8;
                    border-radius: 10rem;
                    cursor: pointer;
                }
            }
    }
`