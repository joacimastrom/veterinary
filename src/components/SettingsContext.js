import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { createContext, useState } from "react";

export const SettingsContext = createContext();
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

export const SettingsProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showGroup, setShowGroup] = useState(true);
  const [showSubGroup, setShowSubGrup] = useState(true);
  const [modeSlider, setModeSlider] = useState(0);

  return (
    <SettingsContext.Provider value={{ showGroup, showSubGroup, modeSlider }}>
      {children}

      <IconButton
        size="large"
        sx={{
          color: "white",
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
        }}
        onClick={() => setOpen(true)}
      >
        <SettingsIcon />
      </IconButton>
      <Drawer anchor={"bottom"} open={open} onClose={() => setOpen(false)}>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt={2}
          pb={2}
        >
          <Typography>Översätt från</Typography>
          <Slider
            value={modeSlider}
            onChange={(e) => setModeSlider(e.target.value)}
            mt={1}
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
        </Box>
      </Drawer>
    </SettingsContext.Provider>
  );
};
