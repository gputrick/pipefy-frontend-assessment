import { getMaterialColor } from "../getMaterialColor"

describe("getMaterialColor test case", () => {
  describe("given the red color", () => {
    it("should return the correct material color", () => {
      const color = "red"
      const resultColor = getMaterialColor(color)

      expect(resultColor).toHaveProperty("500", "#f44336")
    })
  })
  describe("given a color that doesn't exist", () => {
    it("should return undefined", () => {
      const color = "ocher"
      const resultColor = getMaterialColor(color)

      expect(resultColor).toBe(undefined)
    })
  })
})
