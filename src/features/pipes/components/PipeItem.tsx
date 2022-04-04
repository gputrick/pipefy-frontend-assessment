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

  const materialColor = getMaterialColor(pipe.color)
  const backgroundColor = materialColor ? materialColor[200] : pipe.color

  return (
    <>
      <CardActionArea onClick={handleOpenDialog}>
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
