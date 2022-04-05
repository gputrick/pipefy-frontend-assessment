import { getMaterialColor } from "../getMaterialColor"

describe("getMaterialColor test case", () => {
  describe("given the red color", () => {
    it("should return the correct material color", () => {
      const color = "red"
      const key = 500
      const resultColor = getMaterialColor(color, key)

      expect(resultColor).toBe("#f44336")
    })
  })
  describe("given a color that doesn't exist", () => {
    it("should return undefined", () => {
      const color = "ocher"
      const key = 500
      const resultColor = getMaterialColor(color, key)

      expect(resultColor).toBe(color)
    })
  })
})
