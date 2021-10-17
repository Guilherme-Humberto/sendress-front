import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme.colors.primary};
    padding: 2rem 0;
    color: ${props => props.theme.colors.white};

    h3 {
        display: flex;
        align-items: center;
    }

    h3 div {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 100%;
        background: ${props => props.theme.colors.white};
        margin: 0 1rem;
    }
`;