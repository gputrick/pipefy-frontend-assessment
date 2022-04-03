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

    const { getByLabelText } = render(<PipeItem {...pipe} />)

    expect(getByLabelText("Pipe title")).toHaveTextContent(pipe.name)
    expect(getByLabelText("Pipe cards count")).toHaveTextContent(
      pipe.cards_count.toString()
    )
  })
})
