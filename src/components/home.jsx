import React, { useEffect, useState } from "react";
import Note from "./note";
import axios from "axios";
import AddNote from "./addNote";
import { NoteContext } from "../contexts/context";
import FeedbackMessage from "./feedback";

function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/note?user_id=usertest33")
      .then((resp) => {
        setNotes(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setFeedbackMessage("An error has occurred")
        setError(true);
        setCollapse(true)
      });
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        feedbackMessage,
        setFeedbackMessage,
        collapse,
        setSuccess,
        setError,
        setCollapse,
      }}
    >
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        {error && <FeedbackMessage type="error"/>}
        {success && <FeedbackMessage type="success"/>}
        <h1 className="title">Welcome to INOTE</h1>

        {console.log("map", notes)}
        {notes.map((note) => (
          <div
            className="
            note-container"
          >
            <Note
              content={note.note}
              key={note.note_id}
              note_id={note.note_id}
            />
          </div>
        ))}
        <AddNote color="action" />
      </div>
    </NoteContext.Provider>
  );
}

export default Home;
