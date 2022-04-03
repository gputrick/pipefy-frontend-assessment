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

const successMockEmpty = [
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
          pipes: [],
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
  describe("given a success response with data", () => {
    it("should render with right data", async () => {
      const { findAllByTestId } = render(
        <MockedProvider mocks={successMock}>
          <PipeList />
        </MockedProvider>
      )

      expect(await findAllByTestId("pipe-card")).toHaveLength(3)
    })
  })

  describe("given a success response with an empty list", () => {
    it("should render the empty list message", async () => {
      const { findByText } = render(
        <MockedProvider mocks={successMockEmpty}>
          <PipeList />
        </MockedProvider>
      )

      expect(await findByText("Your pipes list is empty.")).toBeInTheDocument()
    })
  })

  describe("given the loading response state", () => {
    it("should render loading", () => {
      const { getByLabelText } = render(
        <MockedProvider mocks={[]}>
          <PipeList />
        </MockedProvider>
      )

      expect(getByLabelText("Loading pipes")).toBeInTheDocument()
    })
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
