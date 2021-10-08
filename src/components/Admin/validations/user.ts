import * as yup from 'yup';

export const userEditValidation = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
})