import styled from 'styled-components';

export const BuilderWrapper = styled.div`
    min-height: 100vh;
    
    .gjs-cv-canvas__frames {
        background: ${props => props.theme.colors.white};
    }

    .gjs-pn-panel.gjs-pn-commands {
        box-shadow: none;
        border: 3px dashed #F0F1F8;
    }

    .gjs-one-bg {
        background-color: ${props => props.theme.colors.white};
    }

    .gjs-input-holder input,
    .gjs-pn-panels select {
        color: #444;
    }

    .gjs-two-color {
        color: #444;
        font-size: 1.7rem;
    }

    .gjs-three-bg {
        background-color: ${props => props.theme.colors.white};
        color: white;
    }

    .gjs-four-color,
    .gjs-four-color-h:hover {
        color: #222;
    }

    .gjs-block-label {
        font-size: 1.3rem;
    }

    .gjs-blocks-c,
    .gjs-pn-panel.gjs-pn-views-container {
        background: #F0F1F8;
    }

    .gjs-pn-panel.gjs-pn-views {
        outline: none !important;
        border: none;
    }

    .gjs-toolbar .gjs-toolbar-item {
        font-size: 1.2rem;
    }

    .gjs-sm-sector .gjs-sm-title,
    .gjs-field {
        background: #e9ecef !important;
    }

    .gjs-blocks-c .gjs-block {
        border: none;
        box-shadow: none;
        background: #fff;
        border-radius: 0.5rem;
    }

    .gjs-blocks-c .gjs-block:hover {
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.primary};
    }

    .gjs-pn-btn {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gjs-pn-btn.gjs-pn-active {
        border-radius: 10rem;
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.primary};
    }

    .gjs-sm-label.gjs-color-warn {
        color: ${props => props.theme.colors.font};
    }
    
    .gjs-radio-item-label,
    .gjs-sm-label span {
        font-size: 1.2rem;
    }

    .gjs-field-arrow-d {
        border-top: 4px solid ${props => props.theme.colors.font};
    }

    .gjs-field-arrow-u {
        border-bottom: 4px solid ${props => props.theme.colors.font};
    }
`;
