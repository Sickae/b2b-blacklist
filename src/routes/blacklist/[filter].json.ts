import {client} from '$lib/graphql-client'
import {getFilteredQuery} from "$lib/graphql-queries";

export const get = async (context: any) => {
    const filter = context.params.filter ?? '';
    try {
        const variables = { filter };
        const {b2BBlacklistCollection} = await client.request(getFilteredQuery, variables)
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