import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        GetPipeCards: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        }
      }
    }
  }
})

export const client = new ApolloClient({
  uri: process.env.REACT_APP_PIPEFY_API_URL || "",
  cache: cache,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_PIPEFY_API_TOKEN || ""}`,
  },
  credentials: "same-origin",
})