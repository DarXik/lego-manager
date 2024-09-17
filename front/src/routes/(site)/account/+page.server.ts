import { config } from 'dotenv';

config()

export const load: any = async ({ fetch, locals, data }: { fetch: any, locals: { session: string }, data: any }) => {

    const response = await fetch(`http://${process.env.SECRET_ORIGIN}:3000/api/v1/sets`, {
        method: 'GET',
        headers: {
            "Authorization": locals.session || ""
        }
    })

    const res1 = await response.json()

    return {
        ...data,
        sets: res1
    }
}
