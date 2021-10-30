import styled from 'styled-components';

export const DocsWrapper = styled.section`
    padding-top: 8rem;
    border-top: 1px solid #ccc;
    margin-bottom: 8rem;
`;

export const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    .form-search {
        background: ${props => props.theme.colors.white};
        height: 4rem;
        padding-left: 1rem;

        input {
            border: none;
            outline: none;
            height: 100%;
            padding: 0 1rem;
        }
    }

    button {
        height: 4rem;
        padding: 0 1rem;
        border: none;
        outline: none;
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.primary};
        transition: .5s;

        :hover {
            cursor: pointer;
            transition: .5s;
            letter-spacing: 0.2rem;
        }
    }
`

export const ContentWrapper = styled.div`
    margin-top: 5rem;

    .content-card {
        max-width: min(90rem, 100%);
        margin-bottom: 5rem;
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        p {
            font-size: 2rem;
            color: #777;
        }
    }
`