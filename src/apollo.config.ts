import { ApolloClient, InMemoryCache } from "@apollo/client"
import { cardFields } from "./features/cards"

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        ...cardFields,
      },
    },
  },
})

export const client = new ApolloClient({
  uri: process.env.REACT_APP_PIPEFY_API_URL || "",
  cache: cache,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PIPEFY_API_TOKEN || ""}`,
  },
  credentials: "same-origin",
})
