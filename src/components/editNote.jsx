import React, { useContext, useState } from "react";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { editNoteContext } from "../contexts/context";
import axios from "axios";
import { userContext } from "../contexts/context";
import SelectCategory from "./select_category";

function EditNote(props) {
  const { edit, noteContent, setNoteContent, setEdit } = useContext(
    editNoteContext
  );
  const [newNoteContent, setNewNoteContent] = useState(noteContent);
  const {
    token,
    userId,
    setFeedbackMessage,
    setError,
    setCollapse,
  } = useContext(userContext);
  const handleNoteChange = (event) => {
    setNewNoteContent(event.target.value);
  };
  const handleModalClose = () => {
    setEdit(false);
  };
  const saveNote = () => {
    axios
      .put(
        "http://127.0.0.1:5000/note",
        {
          note_id: props.note_id,
          note_content: newNoteContent,
          user_id: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        setNoteContent(newNoteContent)
        setEdit(false);
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: "auto" }}>
            <p
              style={{
                fontSize: "10px",
                padding: "10px",
                color: "black",
                width: "100px",
              }}
            >
              {props.datetime}
            </p>
          </div>
          <SelectCategory />
        </div>
        <textarea
          className="add-note-textarea"
          value={newNoteContent}
          style={{ backgroundColor: "white" }}
          contentEditable="true"
          onChange={handleNoteChange}
          suppressContentEditableWarning={true}
        />
        <div style={{ width: "100%", display: "flex" }}>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ margin: "auto" }}
            onClick={() => {
              setEdit(false);
            }}
          >
            Cancel
          </Button>
          {noteContent.length < 1 ? (
            <Button
              size="small"
              sx={{ float: "right", margin: "auto" }}
              variant="contained"
              onClick={saveNote}
              disabled
            >
              save
            </Button>
          ) : (
            <Button
              size="small"
              sx={{ float: "right", margin: "auto" }}
              variant="contained"
              onClick={saveNote}
            >
              save
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default EditNote;
