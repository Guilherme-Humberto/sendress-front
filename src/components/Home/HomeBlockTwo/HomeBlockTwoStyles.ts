import styled from 'styled-components';

export const HomeBlockTwoWrapper = styled.section``;

export const WrapperOne = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 7rem;
    background: ${props => props.theme.colors.main_color};
    color: ${props => props.theme.fonts_color.white};
    padding: 4rem 10rem;
    height: 40rem;
    align-items: center;
    justify-items: center;
    clip-path: polygon(0 5%, 100% 0, 100% 95%, 0% 100%);

    div:not(:last-child) {
        display: flex;
    }

    div:not(:last-child):after {
        content: "";
        display: block;
        width: 0.02rem;
        height: 10rem;
        background: #fff;
    }

    div h1 {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
`
export const Card = styled.div``

export const WrapperTwo = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 8rem auto 0 auto;
    padding: 0 10rem;
    max-width: 180rem;

    div {
        h1 {
            font-size: 3.5rem;
            padding-bottom: 1rem;
            margin-bottom: 2rem;
            border-bottom: 3px solid #edf2f7;
        }

        p  {
            font-size: 2rem;
            margin-top: 1rem;
            font-weight: 300;
        }
    }
`

export const ImageWrapper = styled.div`
    position: relative;
    height: 70rem;
    width: 100%;
`