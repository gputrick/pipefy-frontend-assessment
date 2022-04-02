import { Pipe } from "../types"

export function sortPipes(pipes?: Pipe[]) {
  if (!pipes) return []
  const newArray = [...pipes]
  return newArray.sort((a, b) => {
    return a.name.trim().localeCompare(b.name.trim())
  })
}
