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
  checkPartOfWord,
  getAlternatives,
  getHint,
  getHintLength,
  getMode,
  shuffleArray,
} from "./../utils";

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
    shuffle ? shuffleArray(domain.words) : domain.words
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [alternatives, setAlternatives] = useState(getAlternatives(0, wordSet));
  const [textValue, setTextValue] = useState("");
  const [modeSlider, setModeSlider] = useState(0);
  const [mode, setMode] = useState({ from: "sv", to: "la" });
  const [showSettings, setShowSettings] = useState(false);
  const [hintLength, setHintLength] = useState(1);

  const { group, subGroup, ...currentWord } = wordSet[currentIndex];

  const toWord = currentWord[mode.to].trim();
  const partlyCorrect = checkPartOfWord(textValue, toWord);
  const correctAnswer = checkEqual(textValue, toWord);

  const changeQuestion = (direction) => {
    setShowAlternatives(false);
    setMode(getMode(modeSlider));
    setTextValue("");
    setAlternatives(getAlternatives(currentIndex + direction, wordSet));
    setCurrentIndex((current) => current + direction);
    setHintLength(1);
  };
  const onLastQuestion = currentIndex === wordSet.length - 1;

  const getNextLetter = () => {
    setTextValue(getHint(toWord, hintLength));
    if (hintLength !== toWord.length) {
      setHintLength((curr) => getHintLength(curr, toWord));
    }
  };

  const onChange = ({ target: { value } }) => {
    setTextValue(value);
    if (checkPartOfWord(value, toWord) && value.length >= hintLength) {
      setHintLength((curr) => getHintLength(curr, toWord));
    }
  };

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
        {domain.domain}
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
          {group && (
            <Grow in={showGroup}>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {group}
              </Typography>
            </Grow>
          )}
          <Typography variant="h5" component="div">
            {currentWord[mode.from]}
          </Typography>
          {subGroup && (
            <Grow in={showSubGroup}>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {subGroup}
              </Typography>
            </Grow>
          )}
          <TextField
            onKeyDown={(e) =>
              e.key === "Enter" && correctAnswer && changeQuestion(1)
            }
            value={textValue}
            onChange={onChange}
            id="standard-basic"
            label="Svar"
            variant="standard"
            error={!partlyCorrect}
            color={correctAnswer ? "success" : null}
          />

          <Box
            sx={{
              marginTop: "0rem",
              marginBottom: "0.5rem",
              flexDirection: "column",
              display: "flex",
            }}
          >
            <Button size="small" onClick={getNextLetter}>
              Liten ledtråd
            </Button>
            <Button
              size="small"
              onClick={() => setShowAlternatives((current) => !current)}
            >
              Alternativ
            </Button>
            <Collapse in={showAlternatives}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {alternatives.map((hintIndex) => {
                  const hint = wordSet[hintIndex][mode.to];
                  return (
                    <Grow
                      in={showAlternatives}
                      key={hintIndex}
                      {...(showAlternatives ? { timeout: 500 } : {})}
                    >
                      <Chip
                        sx={{
                          height: "unset",
                          width: "225px",
                          minHeight: "2rem",
                          "> span": { whiteSpace: "normal " },
                        }}
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
            onClick={() => changeQuestion(-1)}
          >
            Förgående
          </Button>
          <Button
            size="small"
            variant="contained"
            disabled={!correctAnswer}
            onClick={onLastQuestion ? onBack : () => changeQuestion(1)}
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
