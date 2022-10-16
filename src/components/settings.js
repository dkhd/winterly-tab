import React, { useEffect, useState } from "react";
import {
  Drawer,
  Divider,
  TextField,
  Typography,
  Box,
  Stack,
  Switch,
} from "@mui/material";

function Settings({
  open,
  closeModal,
  changeName,
  changeTimeFormat,
  checkedFormat,
  username,
}) {
  const handleNameChange = (event) => {
    changeName(event.target.value);
  };

  const handleTimeFormatChange = (event) => {
    const value = event.target.checked;
    const format = value ? "24" : "12";
    changeTimeFormat(format);
  };

  return (
    <React.Fragment key="right">
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: "25%",
          },
        }}
        open={open}
        onClose={closeModal}
        className="p-3"
      >
        <Box sx={{ paddingX: 1 }}>
          <Typography align="center" variant="h6">
            Your Name
          </Typography>
          <Divider
            sx={{
              marginBottom: 2,
            }}
          />
          <TextField
            color="secondary"
            sx={{ width: "100%" }}
            value={username}
            onChange={handleNameChange}
          />
          <Typography align="center" variant="h6">
            Time Format
          </Typography>
          <Divider
            sx={{
              marginBottom: 2,
            }}
          />
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <Typography>12 Hour</Typography>
            <Switch
              size="large"
              checked={checkedFormat}
              onChange={handleTimeFormatChange}
            />
            <Typography>24 Hour</Typography>
          </Stack>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

export default Settings;
