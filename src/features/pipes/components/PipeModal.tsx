import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
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
    <Dialog open={opened} onClose={onClose} scroll="body" fullWidth>
      <DialogTitle>
        <Typography variant="h6">{pipe.name}</Typography>
      </DialogTitle>
      <CardContent>
        <CardList pipeId={pipe.id} cards_count={pipe.cards_count} />
      </CardContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
