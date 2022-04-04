import { Card, CardContent, Typography } from "@mui/material"
import { format } from "date-fns"
import { memo } from "react"
import { Card as CardProps } from "../types"

export const CardItem = memo((card: CardProps) => {
  const formattedDate = format(new Date(card.createdAt), "dd/MM/yyyy HH:mm")

  return (
    <Card variant="outlined" color="primary">
      <CardContent>
        <Typography aria-label="Card title" variant="h6">
          {card.title}
        </Typography>
        <Typography variant="body1">Created at {formattedDate}</Typography>
      </CardContent>
    </Card>
  )
})
