import { getAPIClient } from './api'

type SignInRequestData = {
    email: string
    password: string
}

export async function signInRequest({ email, password }: SignInRequestData) {
    const api = getAPIClient()
    const { data: loginResponse } = await api.post('/user/login', {email, password })
    return loginResponse
}