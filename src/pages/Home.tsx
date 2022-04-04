import { styled, Typography } from "@mui/material"
import { PipeList } from "src/features/pipes"

const MainContent = styled("main")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(8)}}
`

function Home() {
  return (
    <MainContent>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Your pipes
      </Typography>
      <PipeList />
    </MainContent>
  )
}

export default Home
