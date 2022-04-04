import { render } from "@testing-library/react"
import { CardItem } from "../CardItem"

describe("CardItem component test", () => {
  it("should render with right data", () => {
    const { getByText } = render(
      <CardItem id="1" title="Title 1" createdAt="2020-01-01T00:00:00.000Z" />
    )

    expect(getByText("Title 1")).toBeInTheDocument()
    expect(getByText("Created at 31/12/2019 21:00")).toBeInTheDocument()
  })
})
