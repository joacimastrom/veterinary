import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  Grow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { checkEqual, getHints, shuffleArray, testWords } from "./words";

function App() {
  const [currentDomain, setCurrentDomain] = useState(0);
  const [wordSet, setWordSet] = useState(
    shuffleArray(testWords[currentDomain].words)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [hints, setHints] = useState([]);
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    setHints(getHints(currentIndex, wordSet));
    setTextValue("");
    setShowHints(false);
  }, [currentIndex, wordSet]);

  const currentWord = wordSet[currentIndex];

  const correctAnswer = checkEqual(textValue, currentWord.se);

  const onNext = () => setCurrentIndex((current) => current + 1);

  return (
    <div className="App">
      <header className="App-header">
        <Card sx={{ minWidth: 275, position: "relative" }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: 14,
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
              }}
              color="text.secondary"
            >{`${currentIndex + 1}/${wordSet.length}`}</Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {currentWord.group}
            </Typography>
            <Typography variant="h5" component="div">
              {currentWord.la}
            </Typography>
            {currentWord.subGroup && (
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {currentWord.subGroup}
              </Typography>
            )}
            <TextField
              onKeyDown={(e) => e.key === "Enter" && correctAnswer && onNext()}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              id="standard-basic"
              label="Standard"
              variant="standard"
            />

            <Box sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              <Button
                size="small"
                onClick={() => setShowHints((current) => !current)}
              >
                Ledtråd
              </Button>
              <Collapse in={showHints}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "0.5rem",
                  }}
                >
                  {hints.map((hintIndex) => {
                    const hint = wordSet[hintIndex].se;
                    return (
                      <Grow
                        in={showHints}
                        key={hintIndex}
                        {...(showHints ? { timeout: 500 } : {})}
                      >
                        <Chip
                          label={hint}
                          variant="outlined"
                          onClick={() => setTextValue(hint)}
                        />
                      </Grow>
                    );
                  })}
                </Box>
              </Collapse>
            </Box>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              size="small"
              disabled={!currentIndex}
              onClick={() => setCurrentIndex((current) => current - 1)}
            >
              Förgående
            </Button>
            <Button
              size="small"
              variant="contained"
              disabled={!correctAnswer}
              onClick={() => setCurrentIndex((current) => current + 1)}
              color="success"
            >
              Nästa
            </Button>
          </CardActions>
        </Card>
      </header>
    </div>
  );
}

export default App;
