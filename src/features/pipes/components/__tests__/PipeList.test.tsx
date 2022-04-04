import { MockedProvider } from "@apollo/client/testing"
import { render } from "@testing-library/react"
import { PipeList, PIPES_QUERY } from "../PipeList"

const commomRequest = {
  query: PIPES_QUERY,
  variables: {
    organizationId: process.env.REACT_APP_ORGANIZATION_ID,
  },
}

describe("PipeList component", () => {
  describe("given a success response with data", () => {
    it("should render with right data", async () => {
      const successMock = [
        {
          request: commomRequest,
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
      const successMockEmpty = [
        {
          request: commomRequest,
          result: {
            data: {
              organization: {
                pipes: [],
              },
            },
          },
        },
      ]

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

  describe("given the error response state", () => {
    it("should render error message", async () => {
      const errorMock = [
        {
          request: commomRequest,
          error: new Error("Fake error"),
        },
      ]

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
})
