import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { domains } from "../words/words";

export const StartMenu = ({ shuffle, setShuffle, setCurrentDomain }) => {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <Typography variant="h4" marginBottom={2} component="div">
        Välj delmoment
      </Typography>
      {domains.map(({ domain }, index) => (
        <Card
          key={domain}
          sx={{ minWidth: 275 }}
          onClick={() => setExpanded(expanded === index ? null : index)}
        >
          <CardContent sx={{ paddingBottom: "1rem !important" }}>
            <Typography variant="h5" component="div">
              {domain}
            </Typography>
            <Collapse in={expanded === index}>
              <Box sx={{ marginTop: "1rem" }} display="flex">
                <FormGroup>
                  <FormControlLabel
                    onClick={(e) => e.stopPropagation()}
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
                <Button onClick={() => setCurrentDomain(index)}>Starta</Button>
              </Box>
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
