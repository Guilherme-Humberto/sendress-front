import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion'

const rotateAnimation = keyframes`
    0% {
    transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const ModalAlertWrapper = styled(motion.div)`
    position: fixed;
    top: 2rem;
    left: 45%;
    width: 40rem;
    height: 8rem;
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.main_color};
    padding: 1rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgb(0, 0, 0, 0.03);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .loading-icon {
        animation: ${rotateAnimation} 1.2s linear infinite;
    }
`;
