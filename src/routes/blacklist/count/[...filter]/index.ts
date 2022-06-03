import {client} from '$lib/graphql-client'
import {getFilteredCountQuery} from "$lib/graphql-queries";

export const get = async (context: any) => {
    try {
        const variables = {
            filter: context.params.filter ?? getFilteredCountQuery.defaultVariables.filter
        }

        const {b2BBlacklistCollection} = await client.request(getFilteredCountQuery.query, variables)

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