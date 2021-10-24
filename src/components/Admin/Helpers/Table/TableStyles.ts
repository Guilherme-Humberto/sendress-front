import styled from 'styled-components';

export const TableWrapper = styled.div`
    width: 100%;

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
    }

    table {
        width: 100%;

        .widgetLgTr {
            display: grid;
            width: 100%;
            text-align: left;
            align-items: center;
            justify-items: center;
            grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        }
    }


    .widgetLgTr {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        background: #fff;
        padding: 2rem;

        :not(:first-child) {
            :hover {
                background: #eee;
            }
        }

        .widgetLgMenu {
            position: relative;

            :hover div {
                display: flex;
            }
        }

        .widgetLgMenu svg {
            font-size: 2.5rem !important;
            cursor: pointer;
        }
    }

    .widgetLgTh {
        font-size: 2rem;
        color: #555;
    }

    .widgetLgTr td:not(.widgetLgStatus, .widgetLgMenu) {
        word-wrap: break-word;
        max-width: 200px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
    }
    
    .widgetLgTr:not(:last-child) {
        border-bottom: 4px solid #f3f4f6;
    }

    .widgetLgStatus {
        border-radius: 10rem;
        padding: 1rem 0;
        width: 9.5rem;
        font-weight: 600;
        text-align: center;
        cursor: pointer;
    }

    .widgetLgStatus.active {
        background: lightgreen;
    }

    .widgetLgStatus.disabled {
        background: lightsalmon;
    }
`;