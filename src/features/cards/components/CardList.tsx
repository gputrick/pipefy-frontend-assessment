import { gql, useQuery } from "@apollo/client"
import { Alert, Button, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { Card as CardType, Pageable } from "../types"
import { CardItem } from "./CardItem"

export const CARD_QUERY = gql`
  query GetPipeCards($pipeId: ID!, $first: Int, $after: String) {
    allCards(pipeId: $pipeId, first: $first, after: $after) {
      edges {
        node {
          id
          title
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

type CardQueryResult = {
  allCards: Pageable<CardType>
}

type CardQueryVars = {
  pipeId: string
  first?: number
  after?: string
}

type CardListProps = {
  pipeId: string
  cards_count: number
}

export function CardList({ pipeId, cards_count }: CardListProps) {
  const { data, loading, error, fetchMore } = useQuery<
    CardQueryResult,
    CardQueryVars
  >(CARD_QUERY, {
    variables: {
      pipeId,
      first: 3,
    },
  })

  const [loadingMore, setLoadingMore] = useState(false)

  if (loading) return <CircularProgress aria-label="Loading cards" />

  if (error) {
    console.error(error)
    return (
      <Alert severity="error">
        An error has occurrend, was not possible to get your cards.
      </Alert>
    )
  }

  if (!data || data?.allCards?.edges?.length === 0) {
    return <Alert severity="info">Your cards list is empty.</Alert>
  }
  const {
    allCards: { edges, pageInfo },
  } = data

  const handleFetchMore = async () => {
    setLoadingMore(true)

    await fetchMore<CardQueryResult, CardQueryVars>({
      variables: {
        after: pageInfo.endCursor,
      },
    })

    setLoadingMore(false)
  }

  return (
    <>
      <Box
        component="section"
        aria-label="pipe cards"
        display="flex"
        flexDirection="column"
      >
        {edges.map(({ node }) => (
          <Box
            key={node.id}
            data-testid="card-item"
            component="article"
            mr={2}
            mb={2}
          >
            <CardItem {...node} />
          </Box>
        ))}
        {loadingMore && <CircularProgress />}
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography variant="subtitle1" color="textSecondary" align="center">
          {edges.length}/{cards_count} cards loaded
        </Typography>
        <Button
          onClick={handleFetchMore}
          variant="contained"
          data-testid="load-more-cards"
          disabled={!pageInfo.hasNextPage || loadingMore}
        >
          Load more cards
        </Button>
      </Box>
    </>
  )
}
