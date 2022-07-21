import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteNoteIcon from "./delete_note_icon";
import EditNote from "./editNote";
import { editNoteContext } from "../contexts/context";

export default function Note(props) {
  const [noteContent, setNoteContent] = useState(props.content);
  const [edit, setEdit] = useState(false);
  const handleNoteChange = (event) => {
    setNoteContent(event.target.value);
  };
  return (
    <editNoteContext.Provider
      value={{
        setEdit,
        edit,
        noteContent,
        setNoteContent,
      }}
    >
      <div>
        {edit && (
          <EditNote
            content={noteContent}
            note_id={props.note_id}
            datetime={props.datetime}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 420,
            },
          }}
        >
          <Paper elevation={5} style={{ textAlign: "center" }}>
            <DeleteNoteIcon note_id={props.note_id} />
            <p style={{ fontSize: "10px" }}>{props.datetime}</p>
            <textarea
              onClick={() => {
                setEdit(true);
              }}
              className="note"
              value={noteContent}
              style={{ backgroundColor: "white"}}
              contentEditable="true"
              onChange={handleNoteChange}
              suppressContentEditableWarning={true}
            />
            {/* <p className="note" contentEditable="true">
            
          </p> */}
          </Paper>
        </Box>
      </div>
    </editNoteContext.Provider>
  );
}
