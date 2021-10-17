import styled from 'styled-components';

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    label {
        margin-top: 2rem;
    }
    
    input {
        border: 1px solid #ccc;
        outline: none;
        padding: 1rem 2rem;
        border-radius: 10rem;
        
        :focus {
            border: 2px solid ${props => props.theme.colors.primary_light};
        }
    }
`;
