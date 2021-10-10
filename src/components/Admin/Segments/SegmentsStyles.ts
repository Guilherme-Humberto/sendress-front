import styled from 'styled-components';

export const SegmentsWrapper = styled.section`
    width: 100%;
`;

export const SegmentForm = styled.div`

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

                :hover {
                    cursor: pointer;
                    transition: 0.5s;
                    color: #fff;
                    background: ${props => props.theme.colors.font};
                }
            }
        }
`