import React, { useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { NoteContext } from "../contexts/context";
import { userContext } from "../contexts/context";

function AddNote() {
  const { setNotes } = useContext(NoteContext);
  const {
    setSuccess,
    setError,
    setFeedbackMessage,
    setCollapse,
    userId,
    token,
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
        "http://127.0.0.1:5000/note",
        {
          user_id: userId,
          note_content: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
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
            <textarea
              className="add-note-textarea"
              value={message}
              onChange={handleMessageChange}
            />
          </div>
          <Button
            sx={{ marginY: "40%", position: "absolute" }}
            variant="contained"
            onClick={onClickEvent}
          >
            save
          </Button>
        </div>
      </Modal>
      <div className="add-note">
        <IconButton color="primary">
          <AddCircleIcon
            className="add-icon"
            sx={{ fontSize: 50 }}
            onClick={handleOpen}
          ></AddCircleIcon>
        </IconButton>
      </div>
    </div>
  );
}
export default AddNote;
