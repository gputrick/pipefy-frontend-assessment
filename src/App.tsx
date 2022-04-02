import { styled } from "@mui/material";
import React from "react";
import { PipeList } from "./features/pipes/components/PipeList";

const MainContent = styled("main")`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(8)}} {
`;

function App() {
  return (
    <MainContent>
      <PipeList />
    </MainContent>
  );
}

export default App;
