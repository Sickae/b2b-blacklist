import {GraphQLClient} from "graphql-request";
import 'dotenv/config';

export const client = new GraphQLClient(process.env.GRAPHQL_ENDPOINT as string, {
    headers: {
        "Authorization": `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    }
});