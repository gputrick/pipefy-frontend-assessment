import { styled, Typography } from "@mui/material"
import React from "react"
import { PipeList } from "./features/pipes/components/PipeList"

const MainContent = styled("main")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(8)}}
`

function App() {
  return (
    <MainContent>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Your pipes
      </Typography>
      <PipeList />
    </MainContent>
  )
}

export default App
