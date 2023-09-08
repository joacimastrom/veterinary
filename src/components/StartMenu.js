import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { getSavedWordsOrFalse } from "../utils";
import { domains } from "../words/words";

export const StartMenu = ({
  shuffle,
  setShuffle,
  setCurrentDomain,
  setWordSet,
}) => {
  const [expanded, setExpanded] = useState(null);
  const savedWords = getSavedWordsOrFalse(expanded);

  const onStartSaved = () => {
    setWordSet(savedWords);
    setCurrentDomain(expanded);
  };

  return (
    <>
      <Typography variant="h4" marginBottom={2} component="div">
        Välj delmoment
      </Typography>
      {domains.map(({ domain }) => (
        <Card key={domain} sx={{ minWidth: 275, mb: 1.5 }}>
          <CardContent sx={{ paddingBottom: "1rem !important" }}>
            <Typography
              variant="h5"
              component="div"
              onClick={() => setExpanded(expanded === domain ? null : domain)}
            >
              {domain}
            </Typography>
            <Collapse in={expanded === domain}>
              <Box sx={{ marginTop: "1rem" }} display="flex">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={shuffle}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => setShuffle((curr) => !curr)}
                      />
                    }
                    label="Blandad ordning"
                  />
                </FormGroup>
                <Button onClick={() => setCurrentDomain(domain)}>Starta</Button>
              </Box>
              {savedWords && (
                <>
                  <Divider />
                  <Button onClick={onStartSaved}>Starta sparade ord</Button>
                </>
              )}
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
