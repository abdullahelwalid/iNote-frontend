import React, { useContext } from "react";
import { Collapse } from "@mui/material";
import { Alert } from "@mui/material";
import { NoteContext } from "../contexts/context";

function FeedbackMessage(props) {
  const {
    feedbackMessage,
    collapse,
    setSuccess,
    setError,
    setCollapse,
  } = useContext(NoteContext);
  return (
    <div className="feedback">
      <Collapse in={collapse}>
        <Alert
          onClose={() => {
            setCollapse(false);
            setSuccess(false);
            setError(false);
          }}
          severity={props.type}
        >
          {feedbackMessage}
        </Alert>
      </Collapse>
    </div>
  );
}

export default FeedbackMessage;
