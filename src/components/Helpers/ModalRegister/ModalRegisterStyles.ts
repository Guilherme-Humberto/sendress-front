import styled, { css } from 'styled-components';
import { motion } from 'framer-motion'

export const ModalRegisterWrapper = styled(motion.div)`
    position: fixed;
    z-index: 99;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(70rem, 100%);
    background: #fff;
    box-shadow: 20px 0 40px rgb(0, 0, 0, 0.4);

    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 5rem;

    svg.close-icon {
        position: absolute;
        top: 2rem;
        left: 2rem;
        font-size: 3rem;
        cursor: pointer;
    }

    .title-modal {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    form {
        button {
            width: 100%;
            margin-top: 2rem;
            font-weight: 700;
            font-size: 2rem;
            padding: 1.5rem;
            border: none;
            outline: none;
            color: ${props => props.theme.fonts_color.white};
            background: ${props => props.theme.colors.primary_light};
            transition: 0.5s;

            :hover {
                transition: 0.5s;
                cursor: pointer;
                background: ${props => props.theme.colors.font}
            }
        }
    }
`;
