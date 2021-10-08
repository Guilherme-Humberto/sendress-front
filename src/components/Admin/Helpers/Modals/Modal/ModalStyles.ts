import styled from 'styled-components';
import { motion } from 'framer-motion'

export const ModalWrapper = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;

    background: #fff;
    width: 60%;
    box-shadow: 0 20px 40px rgb(0, 0, 0, 0.1);
    overflow-y: scroll;

    ::-webkit-scrollbar {
        background: transparent;
    }
`;
