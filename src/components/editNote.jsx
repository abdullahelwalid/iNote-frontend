import React, { useContext } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { editNoteContext } from "../contexts/context";
import axios from "axios";
import { userContext } from "../contexts/context";

function EditNote(props) {
  const { edit, noteContent, setNoteContent, setEdit, setSize } = useContext(
    editNoteContext
  );
  const {
    token,
    userId,
    setFeedbackMessage,
    setError,
    setCollapse,
  } = useContext(userContext);
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value);
  };
  const handleModalClose = () => {
    setSize("140px");
    setEdit(false);
  };
  const saveNote = () => {
    axios
      .put(
        "http://127.0.0.1:5000/note",
        {
          note_id: props.note_id,
          note_content: noteContent,
          user_id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        setEdit(false);
        setSize("140px");
      })
      .catch((err) => {
        setFeedbackMessage("An error has occurred");
        setCollapse(true);
        setError(true);
      });
  };
  return (
    <Modal open={edit} onClose={handleModalClose}>
      <div className="new-note">
        <p style={{ fontSize: "10px" }}>{props.datetime}</p>
        <textarea
          className="add-note-textarea"
          value={noteContent}
          style={{ backgroundColor: "white" }}
          contentEditable="true"
          onChange={handleNoteChange}
          suppressContentEditableWarning={true}
        />
        {noteContent.length < 1 ? (
          <Button
            sx={{ float: "center", marginBottom: "3px" }}
            variant="contained"
            onClick={saveNote}
            disabled
          >
            save
          </Button>
        ) : (
          <Button
            sx={{ float: "center", marginBottom: "3px" }}
            variant="contained"
            onClick={saveNote}
          >
            save
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default EditNote;
