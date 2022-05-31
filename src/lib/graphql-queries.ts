import {gql} from "graphql-request";

export const getFilteredQuery = gql`query getFiltered($filter: String!) {
  b2BBlacklistCollection(where: {OR: [{characterName_contains: $filter}, {reason_contains: $filter}]}) {
    items {
      characterName
      reason
      date
    }
  }
}`;

export const getAllQuery = gql`query getAll {
  b2BBlacklistCollection {
    items {
      characterName
      reason
      date
    }
  }
}`;