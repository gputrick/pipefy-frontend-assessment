import { Pipe } from "../../types"
import { sortPipes } from "../sortPipes"

describe("sort pipe by name", () => {
  describe("given an usorted array", () => {
    const namesSorted = ["Access request", " IT Onboarding", "IT Requests"]
    const unsortedPipes: Pipe[] = [
      { id: "1", name: namesSorted[1], cards_count: 1, color: "yellow" },
      { id: "2", name: namesSorted[2], cards_count: 1, color: "yellow" },
      { id: "3", name: namesSorted[0], cards_count: 1, color: "yellow" },
    ]

    it("should not change the original", () => {
      const usortedPipesCopy = [...unsortedPipes]
      sortPipes(usortedPipesCopy)

      unsortedPipes.forEach((pipe, index) => {
        expect(pipe).toBe(usortedPipesCopy[index])
      })
    })

    it("should return sorted by name", () => {
      const newArray = sortPipes(unsortedPipes)

      newArray.forEach((pipe, index) => {
        expect(pipe.name).toBe(namesSorted[index])
      })
    })
  })
  describe("given an empty array", () => {
    const pipesEmpty: Pipe[] = []

    it("should return an empty array", () => {
      const newArray = sortPipes(pipesEmpty)

      expect(newArray).toEqual([])
    })
  })

  describe("given an undefined param", () => {
    it("should return an empty array", () => {
      const newArray = sortPipes(undefined)

      expect(newArray).toEqual([])
    })
  })
})
