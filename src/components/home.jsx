import React, { useEffect, useState, useContext } from "react";
import Note from "./note";
import axios from "axios";
import AddNote from "./addNote";
import { NoteContext } from "../contexts/context";
import { userContext } from "../contexts/context";

function Home() {
  const [notes, setNotes] = useState([]);
  const {
    authenticated,
    setAuthenticated,
    setFeedbackMessage,
    setError,
    setCollapse,
    userId,
    token,
  } = useContext(userContext);

  useEffect(() => {
    if (authenticated) {
      axios
        .get("http://127.0.0.1:5000/note?user_id=".concat(userId), {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          setNotes(resp.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            return setAuthenticated(false);
          }
          setFeedbackMessage("An error has occurred");
          setError(true);
          setCollapse(true);
        });
    }
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <h1 className="title">Welcome to INOTE</h1>

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
