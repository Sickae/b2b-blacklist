import {client} from '$lib/graphql-client'
import {getFilteredQuery} from "$lib/graphql-queries";

export const get = async (context: any) => {
    try {
        const variables = {
            limit: +context.params.limit,
            skip: +context.params.skip,
            filter: context.params.filter ?? getFilteredQuery.defaultVariables.filter
        }
        
        const {b2BBlacklistCollection} = await client.request(getFilteredQuery.query, variables)
        
        return {
            status: 200,
            body: b2BBlacklistCollection
        }
    } catch (e: any) {
        return {
            status: 500,
            body: {error: e.message}
        }
    }
}