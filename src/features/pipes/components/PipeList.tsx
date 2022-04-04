import { gql, useQuery } from "@apollo/client"
import { Alert, CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import { useMemo } from "react"
import { Organization } from "../types"
import { sortPipes } from "../utils/sortPipes"
import { PipeItem } from "./PipeItem"

export const PIPES_QUERY = gql`
  query GetOrganizationPipes($organizationId: ID!) {
    organization(id: $organizationId) {
      pipes {
        id
        name
        color
        cards_count
      }
    }
  }
`

type PipesQueryResult = {
  organization: Organization
}
type PipesQueryVars = {
  organizationId: string
}

const ORGANIZATION_ID = process.env.REACT_APP_ORGANIZATION_ID || ""

export function PipeList() {
  const { data, loading, error } = useQuery<PipesQueryResult, PipesQueryVars>(
    PIPES_QUERY,
    { variables: { organizationId: ORGANIZATION_ID } }
  )

  const sortedPipes = useMemo(
    () => sortPipes(data?.organization?.pipes),
    [data]
  )

  if (loading) return <CircularProgress aria-label="Loading pipes" />

  if (error) {
    console.error(error)
    return (
      <Alert severity="error">
        An error has occurrend, was not possible to get your pipes.
      </Alert>
    )
  }

  if (sortedPipes.length === 0)
    return <Alert severity="info">Your pipes list is empty.</Alert>
  return (
    <Box
      component="section"
      aria-label="your pipes"
      display="flex"
      flexWrap="wrap"
    >
      {sortedPipes.map((pipe) => (
        <Box
          key={pipe.id}
          component="article"
          data-testid="pipe-card"
          mr={2}
          mb={2}
        >
          <PipeItem {...pipe} />
        </Box>
      ))}
    </Box>
  )
}
