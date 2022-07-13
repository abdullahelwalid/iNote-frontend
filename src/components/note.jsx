import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";



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
            height: 140,
          },
        }}
      >
        <Paper elevation={5} style={{ textAlign: "center" }}>
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
