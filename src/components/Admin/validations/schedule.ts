import * as yup from 'yup';

export const scheduleValidation = yup.object().shape({
    campaignId: yup.string().required('Campanha é obrigatória'),
    segmentId: yup.string().required('Lista é obrigatória'),
})