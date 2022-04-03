import { Card, CardContent, styled, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Pipe } from "../types"

const PipeCard = styled(Card)<{ color: string }>(({ theme, color }) => ({
  backgroundColor: color,
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
          <Typography variant="h6" align="center" aria-label="Pipe title">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            aria-label="Pipe cards count"
          >
            {`${cards_count} ${cards_count === 1 ? "card" : "cards"}`}
          </Typography>
        </Box>
      </CardContent>
    </PipeCard>
  )
}
