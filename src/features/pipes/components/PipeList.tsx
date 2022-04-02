import { gql, useQuery } from "@apollo/client"
import { Alert, CircularProgress, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useMemo } from "react"
import { Organization } from "../types"
import { sortPipes } from "../utils/sortPipes"
import { PipeItem } from "./PipeItem"

const PIPES_QUERY = gql`
  {
    organization(id: ${process.env.REACT_APP_ORGANIZATION_ID}) {
      id
      name
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

export function PipeList() {
  const { data, loading, error } = useQuery<PipesQueryResult>(PIPES_QUERY)

  const sortedPipes = useMemo(
    () => sortPipes(data?.organization?.pipes),
    [data]
  )

  if (loading) return <CircularProgress />

  if (error)
    return (
      <Alert severity="error">
        An error has occurrend, was not possible to get your pipes.
      </Alert>
    )

  return (
    <Box component="section" display="flex" flexWrap="wrap">
      {sortedPipes.map((pipe) => (
        <Box key={pipe.id} component="article" mr={2} mb={2}>
          <PipeItem {...pipe} />
        </Box>
      ))}
    </Box>
  )
}
