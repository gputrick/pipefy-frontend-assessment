import { FieldPolicy } from "@apollo/client"
import { Card, Pageable } from "./types"

const allCards: FieldPolicy<Pageable<Card>> = {
  keyArgs: ["pipeId"],
  merge(existing, incoming) {
    if (!existing) return incoming

    return {
      edges: [...existing.edges, ...incoming.edges],
      pageInfo: incoming.pageInfo,
    }
  },
}

export const cardFields = {
  allCards,
}
