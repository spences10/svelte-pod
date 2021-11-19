import { GraphQLClient } from 'graphql-request'
const GRAPHQL_ENDPOINT = process.env['GRAPHQL_ENDPOINT']

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  doc_id: `532b0ecb-56c9-4b49-97a7-7d1a9a808b00`,
})
