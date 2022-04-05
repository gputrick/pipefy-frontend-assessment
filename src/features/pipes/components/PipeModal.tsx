import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material"
import { CardList } from "src/features/cards"
import { Pipe } from "../types"

type PipeModalProps = {
  pipe: Pipe
  opened: boolean
  onClose: () => void
}

export function PipeModal({ pipe, opened, onClose }: PipeModalProps) {
  return (
    <Dialog
      open={opened}
      onClose={onClose}
      scroll="body"
      data-testid="pipe-dialog"
      fullWidth
    >
      <DialogTitle>{pipe.name}</DialogTitle>
      <CardContent>
        <CardList pipeId={pipe.id} cards_count={pipe.cards_count} />
      </CardContent>
      <DialogActions>
        <Button data-testid="close-dialog" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
