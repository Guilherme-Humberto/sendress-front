import styled, { css } from 'styled-components';

interface LeadFormProps {
    create?: boolean
    import?: boolean
    edit?: boolean
}

export const LeadsWrapper = styled.section`
    width: 100%;
`;

export const LeadForm = styled.div<LeadFormProps>`
    .services-checkbox {
        display: flex;
        align-items: center;
        gap: 2rem;

        label {
            margin-left: 1rem;
        }

        input {
            cursor: pointer;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        margin-top: 4rem;

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
            border-radius: 10rem;
            background: transparent;
            appearance: none;
            -moz-appearance: none;
            outline: none;
        }

        button {
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: ${props => props.theme.colors.primary};
            border: none;
            outline: none;
            font-size: 1.8rem;
            color: #fff;
            font-weight: 500;
            transition: 0.5s;
            width: fit-content;

            :hover {
                cursor: pointer;
                background: ${props => props.theme.colors.secondary};
            }
        }
    }

    ${props => props.import && css`
        input[type="file"] {
            display: none;
        }

        .lead-file-wrapper {
            margin-top: 5rem;
            width: 100%;
            height: 20rem;
            background: #f5f3f0;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 2rem;
            cursor: pointer;
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

            :hover {
                cursor: pointer;
                transition: 0.5s;
                color: #fff;
                background: ${props => props.theme.colors.font};
            }
        }
    `}
`