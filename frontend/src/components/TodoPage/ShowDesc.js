import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

function ShowDesc(Todo) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <MoreHorizOutlinedIcon color="secondary" fontSize="medium" />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Description</DialogTitle>
        <DialogContent>
          <input
            type="text"
            readOnly
            value={Todo.Description}
            className="list"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowDesc;
