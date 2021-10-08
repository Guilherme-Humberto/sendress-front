import * as yup from 'yup';

export const segmentValidation = yup.object().shape({
    title: yup.string().required('Título é obrigatório'),
})