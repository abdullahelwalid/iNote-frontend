import React, { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { NoteContext } from "../contexts/context";
import { userContext } from "../contexts/context";

export default function DeleteNoteIcon(props) {
  const { notes, setNotes } = useContext(NoteContext);
  const {
    setSuccess,
    setError,
    setFeedbackMessage,
    setCollapse,
    userId,
    token,
  } = useContext(userContext);
  function onClickEvent() {
    axios
      .delete("http://127.0.0.1:5000/note", {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          user_id: userId,
          note_id: props.note_id,
        },
      })
      .then((resp) => {
        setFeedbackMessage("Note deleted successfully");
        setCollapse(true);
        setSuccess(true);
        const newData = notes.filter((note) => {
          return note.note_id !== props.note_id;
        });
        setNotes(newData);
      })
      .catch((err) => {
        setCollapse(true);
        setFeedbackMessage("An error has occurred");
        setError(true);
      });
  }
  return (
    <div className="delete-icon">
      <IconButton onClick={onClickEvent}>
        <DeleteForeverIcon />
      </IconButton>
    </div>
  );
}
