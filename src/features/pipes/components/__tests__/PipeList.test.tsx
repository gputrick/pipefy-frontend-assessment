import { render } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { PipeList, PIPES_QUERY } from "../PipeList"

const successMock = [
  {
    request: {
      query: PIPES_QUERY,
      variables: {
        organizationId: process.env.REACT_APP_ORGANIZATION_ID,
      },
    },
    result: {
      data: {
        organization: {
          pipes: [
            { id: "1", name: "Title 1", cards_count: 1, color: "yellow" },
            { id: "2", name: "Title 2", cards_count: 1, color: "yellow" },
            { id: "3", name: "Title 3", cards_count: 1, color: "yellow" },
          ],
        },
      },
    },
  },
]

const errorMock = [
  {
    request: {
      query: PIPES_QUERY,
      variables: {
        organizationId: process.env.REACT_APP_ORGANIZATION_ID,
      },
    },
    error: new Error("An error occurred"),
  },
]

describe("PipeList component", () => {
  it("should render with right data", async () => {
    const { findAllByTestId } = render(
      <MockedProvider mocks={successMock}>
        <PipeList />
      </MockedProvider>
    )

    expect(await findAllByTestId("pipe-card")).toHaveLength(3)
  })

  it("should render loading", () => {
    const { getByLabelText } = render(
      <MockedProvider mocks={[]}>
        <PipeList />
      </MockedProvider>
    )

    expect(getByLabelText("Loading pipes")).toBeInTheDocument()
  })

  it("should render error message", async () => {
    const { findByText } = render(
      <MockedProvider mocks={errorMock}>
        <PipeList />
      </MockedProvider>
    )

    expect(
      await findByText(
        "An error has occurrend, was not possible to get your pipes."
      )
    ).toBeInTheDocument()
  })
})
