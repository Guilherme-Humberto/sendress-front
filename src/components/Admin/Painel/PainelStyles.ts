import styled from 'styled-components';

export const PainelWrapper = styled.section`
    width: 100%;
    min-height: calc(100vh - 18rem);
`;

export const ListCards = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 3rem;

    div {
        background: #fff;
        width: 35rem;
        height: 28rem;
        padding: 4rem 2rem;
        display: flex;
        flex-direction: column;
        transition: 0.5s;
        border: 3px solid #fff;
        border-radius: 1rem;

        :hover {
            transition: 0.5s;
            border-color: ${props => props.theme.colors.main_color};
            transform: translateY(-1rem);
            cursor: pointer;
        }
        
        
        h3 {
            font-weight: 600;
            margin-bottom: 1rem;
            color: ${props => props.theme.colors.font};
        }

        ul {
            list-style: disc;
            padding-left: 2rem;
            margin-bottom: 3rem;

            li {
                color: ${props => props.theme.fonts_color.dark1};
            }
        }

        .btn-add {
            margin-top: 3rem;
            color: #645BDE;
            background: transparent;
            text-align: left;
            border: none;
            outline: none;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 1rem;

            svg {
                font-size: 2.5rem;
            }
        }
    }

    div:last-child {
        button {
            margin-top: 2rem;
            color: #fff;
            border: none;
            outline: none;
            font-weight: 600;
            padding: 1rem 0;
            border-radius: 10rem;
            font-size: 1.8rem;
            background: ${props => props.theme.colors.main_color};
        }
    }
`
export const ChartWrapper = styled.div`
    background: #fff;
    padding: 4rem 0rem;
    margin-top: 3rem;
    max-height: 35rem;
    border-radius: 1rem;

    .chart-wrapper {
        min-width: 100% !important;
    }
`