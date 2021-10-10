import styled, { css } from 'styled-components';
import { motion } from 'framer-motion'

export const ModalConfirmWrapper = styled(motion.div)<{ answer?: boolean }>`
    position: fixed;
    top: 2rem;
    left: 45%;
    width: 40rem;
    background: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
    border: 3px solid ${props => props.theme.colors.menu};
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgb(0, 0, 0, 0.03);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .btns-confirm {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-top: 2rem;

        button {
            padding: 0.3rem 1.7rem;
            font-size: 1.58rem;
            border: none;
            outline: none;
            font-weight: 500;
            border-radius: 0.2rem;
            cursor: pointer;
        }
    }
`;
