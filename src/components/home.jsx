import React, { useEffect, useState } from "react";
import Note from "./note";
import axios from "axios";
import { Alert } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import AddNote from "./addNote";


function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(false);
  const [collapse, setCollapse]= useState(true);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/note?user_id=usertest33")
      .then((resp) => {
        console.log(resp);
        setNotes(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true)
      });
  },[]);

  return (
    error ? 
    <Collapse in={collapse}>
    <Alert onClose={() => {setCollapse(false)}} severity="error">An error has occurred</Alert>
    </Collapse>
    :  
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <h1 className="title">Welcome to INOTE</h1>
      <AddNote color="action"/>
      {notes.map((note) => (
        <div
          className="
            note-container"
        >
          <Note content={note.note} key={note.note_id} note_id={note.note_id}/>
          
        </div>
      ))}
    </div>
  );
}

export default Home;
