import * as yup from 'yup';

export const campaignValidation = yup.object().shape({
    name: yup.string().required('Título obrigatório'),
    from: yup.string().email().required('Remetente obrigatório'),
    to: yup.string().required('Destinatário obrigatório'),
    subject: yup.string(),
    content: yup.string()
        .required('Conteúdo obrigatório')
})