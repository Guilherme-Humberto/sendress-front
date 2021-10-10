import styled from 'styled-components';
import { motion } from 'framer-motion'

interface Props {
    height: number
    width: number
}

export const ModalWrapper = styled(motion.div)<Props>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(63, 63, 63, 0.25);
    
    
    .content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: min(${props => props.width ? props.width + 'rem' : 70 + 'rem'}, 100%);
        transform: translate(-50%, -50%);
        background: ${props => props.theme.colors.white};
        padding: 4rem;
        height: ${props => props.height ? props.height + '%' : 'fit-content'};
        overflow-y: scroll;
    
        ::-webkit-scrollbar {
            background: transparent;
        }
    }
`;
