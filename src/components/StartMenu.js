import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { sections } from "../words/words";

export const StartMenu = ({ match }) => {
  /* const [currentDomain, setCurrentDomain] = useState(null); */

  return (
    <>
      <Typography variant="h4" marginBottom={2} component="div">
        Välj PM
      </Typography>
      {sections.map(({ name, id }) => (
        <Link to={`/${id}`} key={name}>
          <Card sx={{ minWidth: 275, mb: 1.5 }}>
            <CardContent sx={{ paddingBottom: "1rem !important" }}>
              <Typography variant="h5" component="div">
                {name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
};
