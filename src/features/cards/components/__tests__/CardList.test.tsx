import { MockedProvider } from "@apollo/client/testing"
import { fireEvent, render, waitFor } from "@testing-library/react"
import { cache } from "src/apollo.config"
import { CardList, CARD_QUERY } from "../CardList"

const commonRequest = {
  query: CARD_QUERY,
  variables: {
    pipeId: "1",
    first: 3,
  },
}

describe("CardList component", () => {
  describe("given a success response with data", () => {
    const successMock = [
      {
        request: commonRequest,
        result: {
          data: {
            allCards: {
              edges: [
                {
                  node: {
                    id: "515158596",
                    title: "Gray Matter Technologies",
                    createdAt: "2022-04-02T02:14:45Z",
                  },
                },
                {
                  node: {
                    id: "515357391",
                    title: "Odio repudiandae",
                    createdAt: "2022-04-03T02:18:24Z",
                  },
                },
              ],
              pageInfo: {
                hasNextPage: true,
                endCursor: "WyIwLjUiLCIzLjAiLDUxNTM1NzQ1NV0",
              },
            },
          },
        },
      },
    ]

    it("should render with right data", async () => {
      const { findAllByTestId } = render(
        <MockedProvider mocks={successMock}>
          <CardList pipeId={commonRequest.variables.pipeId} cards_count={3} />
        </MockedProvider>
      )

      expect(await findAllByTestId("card-item")).toHaveLength(2)
    })

    describe("when user clicks on load more button", () => {
      const loadMoreMock = [
        {
          request: {
            ...commonRequest,
            variables: {
              ...commonRequest.variables,
              after: "WyIwLjUiLCIzLjAiLDUxNTM1NzQ1NV0",
            },
          },
          result: {
            data: {
              allCards: {
                edges: [
                  {
                    node: {
                      id: "515357455",
                      title: "Dolore minima nisi aspernatur aliquid in et sed",
                      createdAt: "2022-04-03T02:19:48Z",
                    },
                  },
                ],
                pageInfo: {
                  hasNextPage: false,
                  endCursor: null,
                },
              },
            },
          },
        },
      ]

      it("should load more cards", async () => {
        const { findAllByTestId, getByTestId } = render(
          <MockedProvider
            mocks={[...successMock, ...loadMoreMock]}
            cache={cache}
          >
            <CardList pipeId={commonRequest.variables.pipeId} cards_count={3} />
          </MockedProvider>
        )

        expect(await findAllByTestId("card-item")).toHaveLength(2)

        expect(getByTestId("load-more-cards")).toBeEnabled()
        fireEvent.click(getByTestId("load-more-cards"))

        await waitFor(() => findAllByTestId("card-item"))
        expect(await findAllByTestId("card-item")).toHaveLength(3)
      })
    })
  })

  describe("given a success response with an empty list", () => {
    const successMockEmpty = [
      {
        request: commonRequest,
        result: {
          data: {
            allCards: {
              edges: [],
              pageInfo: {
                hasNextPage: false,
                endCursor: null,
              },
            },
          },
        },
      },
    ]
    it("should render the empty list message", async () => {
      const { findByText } = render(
        <MockedProvider mocks={successMockEmpty}>
          <CardList pipeId={commonRequest.variables.pipeId} cards_count={3} />
        </MockedProvider>
      )

      expect(await findByText("Your cards list is empty.")).toBeInTheDocument()
    })
  })

  describe("given a success response with just one page", () => {
    const successMockEmpty = [
      {
        request: commonRequest,
        result: {
          data: {
            allCards: {
              edges: [
                {
                  node: {
                    id: "515158596",
                    title: "Gray Matter Technologies",
                    createdAt: "2022-04-02T02:14:45Z",
                  },
                },
              ],
              pageInfo: {
                hasNextPage: false,
                endCursor: null,
              },
            },
          },
        },
      },
    ]
    it("should render data and disable load more button", async () => {
      const { getByTestId, findAllByTestId } = render(
        <MockedProvider mocks={successMockEmpty}>
          <CardList pipeId={commonRequest.variables.pipeId} cards_count={3} />
        </MockedProvider>
      )

      expect(await findAllByTestId("card-item")).toHaveLength(1)
      expect(getByTestId("load-more-cards")).toBeDisabled()
    })
  })

  describe("given the loading response state", () => {
    it("should render loading", () => {
      const { getByLabelText } = render(
        <MockedProvider mocks={[]}>
          <CardList pipeId={commonRequest.variables.pipeId} cards_count={3} />
        </MockedProvider>
      )

      expect(getByLabelText("Loading cards")).toBeInTheDocument()
    })
  })

  describe("given the error response state", () => {
    const errorMock = [
      {
        request: commonRequest,
        error: new Error("Fake error"),
      },
    ]
    it("should render error message", async () => {
      const { findByText } = render(
        <MockedProvider mocks={errorMock}>
          <CardList pipeId={commonRequest.variables.pipeId} cards_count={3} />
        </MockedProvider>
      )

      expect(
        await findByText(
          "An error has occurrend, was not possible to get your cards."
        )
      ).toBeInTheDocument()
    })
  })
})
