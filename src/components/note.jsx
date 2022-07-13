import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteNoteIcon from "./delete_note_icon";


export default function Note(props) {
  return (
    <div>
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
        <DeleteNoteIcon note_id={props.note_id}/>

        <div style={{textAlign: "right", width: "40px", float: "right"}}>
        </div>
          <p
            className="note"
            contentEditable="true"
          >
            {props.content}
          </p>
        </Paper>
      </Box>
    </div>
  );
}
