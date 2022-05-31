import {client} from '$lib/graphql-client'
import {getAllQuery} from "$lib/graphql-queries";

export const get = async () => {
    try {
        const {b2BBlacklistCollection} = await client.request(getAllQuery)
        return {
            status: 200,
            body: b2BBlacklistCollection.items
        }
    } catch (e: any) {
        return {
            status: 500,
            body: {error: e.message}
        }
    }
}