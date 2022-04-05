import {
  Card,
  CardActionArea,
  CardContent,
  styled,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { memo, useState } from "react"
import { Pipe } from "../types"
import { getMaterialColor } from "../utils/getMaterialColor"
import { PipeModal } from "./PipeModal"

const PipeCard = styled(Card)<{ bgcolor: string }>(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  width: 300,
  minHeight: 132,
}))

export const PipeItem = memo((pipe: Pipe) => {
  const [dialogOpened, setDialogOpened] = useState(false)

  const handleOpenDialog = () => setDialogOpened(true)
  const handleCloseDialog = () => setDialogOpened(false)

  const backgroundColor = getMaterialColor(pipe.color, 200)

  return (
    <>
      <CardActionArea data-testid="open-pipe-dialog" onClick={handleOpenDialog}>
        <PipeCard variant="outlined" bgcolor={backgroundColor}>
          <CardContent>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              component="header"
            >
              <Typography variant="h6" component="h2" align="center">
                {pipe.name}
              </Typography>
              <Typography
                variant="subtitle1"
                component="p"
                color="textSecondary"
              >
                {`${pipe.cards_count} ${
                  pipe.cards_count === 1 ? "card" : "cards"
                }`}
              </Typography>
            </Box>
          </CardContent>
        </PipeCard>
      </CardActionArea>
      {dialogOpened && (
        <PipeModal
          pipe={pipe}
          onClose={handleCloseDialog}
          opened={dialogOpened}
        />
      )}
    </>
  )
})
