import styled from 'styled-components';

export const PaginationWrapper = styled.div`
    .pagination {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-top: 2rem;

        .page-num {
            font-weight: 500;
            width: 3rem;
            height: 3rem;
            border-radius: 0.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${props => props.theme.colors.dark1};
        }

        .page-item p {
            cursor: pointer;
        }
    }
`