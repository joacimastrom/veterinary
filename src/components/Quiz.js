import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  FormControlLabel,
  FormGroup,
  Grow,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  checkEqual,
  getHints,
  getMode,
  shuffleArray,
  testWords,
} from "./../words";

export const translationOptions = [
  {
    value: 0,
    label: "Svenska",
  },
  {
    value: 50,
    label: "Blandat",
  },
  {
    value: 100,
    label: "Latin",
  },
];

export const Quiz = ({ domain, onBack, shuffle }) => {
  const [showGroup, setShowGroup] = useState(true);
  const [showSubGroup, setShowSubGrup] = useState(true);
  const [wordSet /* , setWordSet */] = useState(
    shuffle ? shuffleArray(testWords[domain].words) : testWords[domain].words
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [hints, setHints] = useState(getHints(0, wordSet));
  const [textValue, setTextValue] = useState("");
  const [modeSlider, setModeSlider] = useState(0);
  const [mode, setMode] = useState({ from: "la", to: "se" });
  const [showSettings, setShowSettings] = useState(false);

  const currentWord = wordSet[currentIndex];

  const correctAnswer = checkEqual(textValue, currentWord[mode.to]);

  const onNext = () => {
    setShowHints(false);
    setMode(getMode(modeSlider));
    setTextValue("");
    setHints(getHints(currentIndex + 1, wordSet));
    setCurrentIndex((current) => current + 1);
  };
  const onLastQuestion = currentIndex === wordSet.length - 1;

  return (
    <>
      <Button
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          color: "white",
          alignSelf: "flex-start",
        }}
        onClick={onBack}
      >
        Tillbaka
      </Button>
      <Typography variant="h4" marginBottom={2} component="div">
        {testWords[domain].domain}
      </Typography>
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
          <Grow in={showGroup}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {currentWord.group}
            </Typography>
          </Grow>
          <Typography variant="h5" component="div">
            {currentWord[mode.from]}
          </Typography>
          <Grow in={showSubGroup}>
            {currentWord.subGroup && (
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {currentWord.subGroup}
              </Typography>
            )}
          </Grow>
          <TextField
            onKeyDown={(e) => e.key === "Enter" && correctAnswer && onNext()}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            id="standard-basic"
            label="Svar"
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
                  const hint = wordSet[hintIndex][mode.to];
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
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
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
            onClick={onLastQuestion ? onBack : onNext}
            color="success"
          >
            {onLastQuestion ? "Klar" : "Nästa"}
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ minWidth: 275, marginTop: "0.5rem" }}>
        <CardContent sx={{ padding: "0.5rem !important" }}>
          <Typography
            onClick={() => setShowSettings((curr) => !curr)}
            color="text.secondary"
          >
            Inställningar
          </Typography>
          <Collapse in={showSettings}>
            <Typography mt={1} mb={-1}>
              Översätt från
            </Typography>
            <Slider
              value={modeSlider}
              onChange={(e) => setModeSlider(e.target.value)}
              sx={{ width: 200, marginBottom: "1.5rem" }}
              defaultValue={0}
              step={50}
              marks={translationOptions}
              label="Språk"
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={showGroup}
                    onChange={() => setShowGroup((curr) => !curr)}
                  />
                }
                label="Visa grupp"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={showSubGroup}
                    onChange={() => setShowSubGrup((curr) => !curr)}
                  />
                }
                label="Visa undergrupp"
              />
            </FormGroup>
          </Collapse>
        </CardContent>
      </Card>
    </>
  );
};
