import styled from 'styled-components';

export const TemplatesWrapper = styled.section`
    .list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
        margin-top: 9rem;

        .template-card {
            max-width: 30rem;
            font-size: 1.2rem !important;
            height: 15rem;
            background: ${props => props.theme.colors.white};
        }
    }

    `;

export const ButtonLink = styled.a`
    position: absolute;
    bottom: 4rem;
    right: 4rem;
    width: 6rem;
    height: 6rem;
    background: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10rem;
    box-shadow: 0 10px 20px rgb(0, 0, 0, 0.1);
    cursor: pointer;

    svg {
        font-size: 4rem;
        color: ${props => props.theme.colors.white};
    }

`