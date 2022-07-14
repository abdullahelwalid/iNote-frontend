import React, { useEffect, useState } from "react";
import Note from "./note";
import axios from "axios";
import { Alert } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import AddNote from "./addNote";

function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [count, setCount] = useState(0);

  const updateEffect = () => {
    setCount(count + 1);
  };

  const getUpdate = (data) => {
    // setNotes((prevItems) => [...prevItems, data]);
    updateEffect()
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/note?user_id=usertest33")
      .then((resp) => {
        setNotes(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [count]);

  return error ? (
    <Collapse in={collapse}>
      <Alert
        onClose={() => {
          setCollapse(false);
        }}
        severity="error"
      >
        An error has occurred
      </Alert>
    </Collapse>
  ) : (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <h1 className="title">Welcome to INOTE</h1>

      {console.log("map", notes)}
      {notes.map((note) => (
        <div
          className="
            note-container"
        >
          <Note content={note.note} key={note.note_id} note_id={note.note_id} />
        </div>
      ))}
      <AddNote color="action" func={getUpdate} />
    </div>
  );
}

export default Home;
