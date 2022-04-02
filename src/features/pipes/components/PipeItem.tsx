import { Card, CardContent, styled, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Pipe } from "../types"
import * as colors from "@mui/material/colors"

const PipeCard = styled(Card)<{ color: string }>(({ theme, color }) => ({
  backgroundColor: colors.yellow[200],
  width: 300,
  minHeight: 132,
}))

export function PipeItem({ name, cards_count, color }: Pipe) {
  return (
    <PipeCard variant="outlined" color={color}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6" align="center">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {`${cards_count} ${cards_count === 1 ? "card" : "cards"}`}
          </Typography>
        </Box>
      </CardContent>
    </PipeCard>
  )
}
