import * as colors from "@mui/material/colors"

export function getMaterialColor(color: string) {
  switch (color) {
    case "red":
      return colors.red
    case "pink":
      return colors.pink
    case "purple":
      return colors.purple
    case "deepPurple":
      return colors.deepPurple
    case "indigo":
      return colors.indigo
    case "blue":
      return colors.blue
    case "lightBlue":
      return colors.lightBlue
    case "cyan":
      return colors.cyan
    case "teal":
      return colors.teal
    case "green":
      return colors.green
    case "lightGreen":
      return colors.lightGreen
    case "lime":
      return colors.lime
    case "yellow":
      return colors.yellow
    case "amber":
      return colors.amber
    case "orange":
      return colors.orange
    case "deepOrange":
      return colors.deepOrange
    case "brown":
      return colors.brown
    case "grey":
      return colors.grey
    case "blueGrey":
      return colors.blueGrey
    default:
      return
  }
}
