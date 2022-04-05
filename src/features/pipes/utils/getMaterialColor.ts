import { Color } from "@mui/material"
import * as colors from "@mui/material/colors"

type Colors = typeof colors

export function getMaterialColor(color: string, key: keyof Color) {
  const materialColor = colors[color as keyof Colors]

  if (!!materialColor) {
    return materialColor[key as keyof typeof materialColor]
  }
  return color
}
