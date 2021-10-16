import * as yup from 'yup';

export const campaignValidation = yup.object().shape({
    name: yup.string().required('Título obrigatório'),
    senderId: yup.string().required('Remetente obrigatório'),
    segmentId: yup.string().required('Destinatário obrigatório'),
    subject: yup.string(),
    content: yup.string()
        .required('Conteúdo obrigatório')
})