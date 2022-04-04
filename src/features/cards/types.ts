export type Card = {
  id: string
  title: string
  createdAt: string
}

export type Pageable<T> = {
  edges: Edge<T>[]
  pageInfo: PageInfo
}

export type Edge<T> = {
  node: T
}

export type PageInfo = {
  endCursor: string
  hasNextPage: Boolean
}
