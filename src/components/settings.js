import React from 'react';
import { Drawer, TextField, Typography, Stack, Switch } from '@mui/material';

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
    const format = value ? '24' : '12';
    changeTimeFormat(format);
  };

  return (
    <React.Fragment key="right">
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: '25%',
          },
        }}
        open={open}
        onClose={closeModal}
        className="p-3"
      >
        <div className="bg-blue-200 h-full">
          <div className="h-10 p-2 text-center text-xl tracking-wide font-semibold">
            Enter your name
          </div>
          <div className="px-5">
            <TextField
              color="info"
              sx={{ width: '100%' }}
              value={username}
              onChange={handleNameChange}
            />
          </div>
          <div className="h-10 p-2 text-center text-xl text-center text-xl tracking-wide font-semibold">
            Time Format
          </div>
          <div className="h-10">
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
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Settings;
