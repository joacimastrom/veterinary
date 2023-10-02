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
import { Link, useParams } from "react-router-dom";
import { getSavedWordsOrFalse } from "../utils";
import { sections } from "../words/words";

export const DomainSelect = ({}) => {
  const [shuffle, setShuffle] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const { sectionId } = useParams();

  const currentSection = sections.find(({ id }) => id === sectionId);

  if (!currentSection) return "Error, sidan finns inte";

  const { domains } = currentSection;
  const savedWords = getSavedWordsOrFalse(expanded);

  return (
    <>
      <Typography variant="h4" marginBottom={2} component="div">
        Välj delmoment
      </Typography>
      {domains.map(({ domain, id }) => (
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
                <Link
                  to={{
                    pathname: `/${sectionId}/${id}`,
                    search: shuffle ? "?shuffle=true" : null,
                  }}
                >
                  <Button>Starta</Button>
                </Link>
              </Box>
              {savedWords && (
                <>
                  <Divider sx={{ margin: "0.5rem 0" }} />
                  <Link
                    to={{
                      pathname: `/${sectionId}/${id}`,
                      search: "?saved=true",
                    }}
                  >
                    <Button>Öva sparade ord</Button>
                  </Link>
                </>
              )}
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
