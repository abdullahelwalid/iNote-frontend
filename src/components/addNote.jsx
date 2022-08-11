import React, { useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { NoteContext } from "../contexts/context";
import { userContext } from "../contexts/context";
import SelectCategory from "./select_category";

function AddNote() {
  const { setNotes } = useContext(NoteContext);
  const {
    setSuccess,
    setError,
    setFeedbackMessage,
    setCollapse,
    userId,
    token,
    URL
  } = useContext(userContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  function onClickEvent() {
    axios
      .post(
        `${URL}/note`,
        {
          user_id: userId,
          note_content: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((resp) => {
        setFeedbackMessage("Note added successfully");
        setCollapse(true);
        setSuccess(true);
        setOpen(false);
        setMessage("");
        setNotes((prevItems) => [...prevItems, resp.data]);
      })
      .catch((err) => {
        setFeedbackMessage("An error has occurred while adding your note");
        setCollapse(true);
        setError(true);
      });
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <div className="new-note">
          <SelectCategory/>
            <textarea
              className="add-note-textarea"
              value={message}
              onChange={handleMessageChange}
            />
             <Button
            size="small"
            variant="contained"
            color="error"
            sx={{marginRight: "10px"}}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{position: "relative" }}
            variant="contained"
            onClick={onClickEvent}
            size="small"
          >
            save
          </Button>
         
          
          </div>
        </div>
      </Modal>
      <div className="add-note">
        <IconButton onClick={handleOpen} color="primary">
          <AddCircleIcon
            className="add-icon"
            sx={{ fontSize: 50 }}
            
          ></AddCircleIcon>
        </IconButton>
      </div>
    </div>
  );
}
export default AddNote;
