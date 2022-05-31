import {GraphQLClient} from "graphql-request";

export const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
    headers: {
        "Authorization": `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    }
});