import { render } from "@testing-library/react"
import { Pipe } from "../../types"
import { PipeItem } from "../PipeItem"

describe("PipeItem component", () => {
  it("should render with right data", () => {
    const pipe: Pipe = {
      id: "1",
      name: "Pipe name",
      cards_count: 1,
      color: "yellow",
    }

    const { getByText } = render(<PipeItem {...pipe} />)

    expect(getByText(pipe.name)).toBeInTheDocument()
    expect(getByText(`${pipe.cards_count} card`)).toBeInTheDocument()
  })
})
