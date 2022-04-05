import { MockedProvider } from "@apollo/client/testing"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Pipe } from "../../types"
import { PipeItem } from "../PipeItem"

const pipe: Pipe = {
  id: "1",
  name: "Pipe name",
  cards_count: 2,
  color: "yellow",
}

describe("PipeItem component", () => {
  describe("given a pipe with two cards", () => {
    beforeEach(() => {
      render(
        <MockedProvider>
          <PipeItem {...pipe} />
        </MockedProvider>
      )
    })
    it("should render with right data and cards on plural", () => {
      const { getByText, getByTestId } = screen

      expect(getByTestId("open-pipe-dialog")).toHaveTextContent(pipe.name)
      expect(getByText(`${pipe.cards_count} cards`)).toBeInTheDocument()
    })

    describe("when user clicks on PipeItem", () => {
      beforeEach(async () => {
        const { getByTestId, findByTestId } = screen

        fireEvent.click(getByTestId("open-pipe-dialog"))
        await waitFor(() => findByTestId("pipe-dialog"))
      })
      it("should open modal with right data", async () => {
        const { getByTestId } = screen

        expect(getByTestId("pipe-dialog")).toHaveTextContent(pipe.name)
      })
      describe("when user clicks on close dialog", () => {
        it("should close dialog", async () => {
          const { getByTestId, queryByTestId } = screen

          expect(getByTestId("close-dialog")).toBeEnabled()
          fireEvent.click(getByTestId("close-dialog"))

          await waitFor(() => queryByTestId("pipe-dialog"))
          expect(queryByTestId("pipe-dialog")).not.toBeInTheDocument()
        })
      })
    })
  })
  describe("given a pipe with 1 card count", () => {
    beforeEach(() => {
      render(
        <MockedProvider>
          <PipeItem {...pipe} cards_count={1} />
        </MockedProvider>
      )
    })
    it("should render with cards on singular", () => {
      const { getByText } = screen

      expect(getByText(`1 card`)).toBeInTheDocument()
    })
  })
})
