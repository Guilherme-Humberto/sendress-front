import * as yup from 'yup';

export const contactValidation = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    business: yup.string(),
    email: yup.string().email().required('Email obrigatório'),
    segmentId: yup.string()
})

export const contactEditValidation = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    business: yup.string(),
    email: yup.string().email(),
    segmentId: yup.string()
})