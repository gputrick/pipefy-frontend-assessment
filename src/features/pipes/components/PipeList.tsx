import { gql, useQuery } from "@apollo/client";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Organization } from "../types";
import { PipeItem } from "./PipeItem";

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
`;

type PipesQueryResult = {
  organization: Organization;
};

export function PipeList() {
  const { data, loading } = useQuery<PipesQueryResult>(PIPES_QUERY);

  console.log(data);

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Your pipes
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box component="section" display="flex" flexWrap="wrap">
          {data?.organization.pipes.map((pipe) => (
            <Box key={pipe.id} component="article" mr={2} mb={2}>
              <PipeItem {...pipe} />
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}
