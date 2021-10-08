import useSwr from 'swr'
import { getAPIClient } from '../../services/api'

export default function useFetcher<Data = any, Error = any>(url: string, { user, token }: { user: number, token: string }) {
    const { data, error } = useSwr<Data, Error>(url, async url => {
        const response = await getAPIClient().get(url, {
            headers: { userid: user, Authorization: `Bearer ${token}` }
        })
        const data = await response.data

        return data
    }, {
        revalidateIfStale: true,
        refreshInterval: 2000
    })

    return { data, error }
}