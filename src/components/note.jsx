import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteNoteIcon from "./delete_note_icon";
import EditNote from "./editNote";
import { editNoteContext } from "../contexts/context";
import { Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function Note(props) {
  const [noteContent, setNoteContent] = useState(props.content);
  const [edit, setEdit] = useState(false);
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Chip
                label={props.category? props.category.category: "----"}
                variant="outlined"
                size="small"
                sx={{ fontSize: "10px", margin: "10px" }}
                color="primary"
              />
              <p style={{ fontSize: "10px", margin: "auto" }}>
                {props.datetime}
              </p>
              <div style={{ display: "inline" }}>
                <DeleteNoteIcon note_id={props.note_id} />
                <IconButton
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <EditIcon color="success" sx={{ fontSize: "15px" }} />
                </IconButton>
              </div>
            </div>
            <textarea
              className="note"
              value={noteContent}
              style={{ backgroundColor: "white" }}
              onChange={() => {}}
            />
          </Paper>
        </Box>
      </div>
    </editNoteContext.Provider>
  );
}
