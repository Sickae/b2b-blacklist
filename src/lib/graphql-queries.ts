import {gql} from "graphql-request";

export const getFilteredQuery = {
    query: gql`query getFiltered($limit: Int!, $skip: Int, $filter: String!) {
        b2BBlacklistCollection(limit: $limit, skip: $skip, where: {
            OR: [
                {characterName_contains: $filter},
                {reason_contains: $filter},
            ]
        }) {
            items {
                characterName,
                reason,
                date,
            },
            total,
            limit,
            skip,
        }
    }`,
    variables: {
        limit: 100,
        skip: 0,
        filter: '',
    }
};