import { ApolloProvider } from "@apollo/client"
import { PropsWithChildren } from "react"
import { client } from "./apollo.config"
import Home from "./pages/Home"

const Providers = ({ children }: PropsWithChildren<{}>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

function App() {
  return (
    <Providers>
      <Home />
    </Providers>
  )
}

export default App
