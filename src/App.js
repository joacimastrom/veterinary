import { Button } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { DomainSelect } from "./components/DomainSelect";
import { QuizPage } from "./components/QuizPage";
import { StartMenu } from "./components/StartMenu";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="App">
      {pathname !== "/" && (
        <Button
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            color: "white",
            alignSelf: "flex-start",
          }}
          onClick={() => navigate(-1)}
        >
          Tillbaka
        </Button>
      )}
      <Routes>
        <Route path="/" exact element={<StartMenu />} />
        <Route path="/:sectionId/" element={<DomainSelect />} />
        <Route path="/:sectionId/:domainId" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
