import * as yup from 'yup';

export const leadValidation = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    business: yup.string(),
    email: yup.string().email().required('Email obrigatório'),
    segmentId: yup.string()
})

export const leadEditValidation = yup.object().shape({
    name: yup.string(),
    phone: yup.string(),
    business: yup.string(),
    email: yup.string().email(),
    segmentId: yup.string()
})