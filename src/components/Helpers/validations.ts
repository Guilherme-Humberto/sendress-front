import * as yup from 'yup';

export const loginValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

export const forgotPasswordValidation = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup.string().required(),
})