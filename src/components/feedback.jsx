import React, { useContext, useState, useEffect } from "react";
import { Collapse } from "@mui/material";
import { Alert } from "@mui/material";
import { userContext } from "../contexts/context";

function FeedbackMessage(props) {
  const {
    feedbackMessage,
    collapse,
    setSuccess,
    setError,
    setCollapse,
  } = useContext(userContext);
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

export function Message(props) {
  const [show, setShow] = useState(props.show);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [show]);

  return (
    <div>
      { show && <div>
      <Alert severity="success" color="success">
      {props.category} added successfully
    </Alert>
      </div>
    }
    </div>
  );
}

export default FeedbackMessage;
