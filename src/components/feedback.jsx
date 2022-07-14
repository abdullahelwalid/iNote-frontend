import React, { useState } from "react";
import { Collapse } from "@mui/material";
import { Alert } from "@mui/material";


function FeedbackMessage(props) {
  const [collapse, setCollapse] = useState(true);
  return (
    <Collapse in={collapse}>
      <Alert
        onClose={() => {
          setCollapse(false);
        }}
        severity={props.type}
      >
        {props.message}
      </Alert>
    </Collapse>
  );
}

export default FeedbackMessage;
