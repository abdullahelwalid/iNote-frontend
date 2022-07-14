import React, { useState, useContext } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { NoteContext } from "../contexts/context";
import FeedbackMessage from "./feedback";



function AddNote() {
  const { setNotes } = useContext(NoteContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };
  function onClickEvent() {
    axios
      .post("http://127.0.0.1:5000/note", {
        user_id: "usertest33",
        note_content: message,
      })
      .then((resp) => {
        setSuccess(true);
        setOpen(false);
        setMessage("");
        setNotes((prevItems) => [...prevItems, resp.data]);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }
  return (
    <div>
      {error && <FeedbackMessage message="an error has occured" type="error"/>}
      {success && <FeedbackMessage message="Note added Successfully" type="success"/>}
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
