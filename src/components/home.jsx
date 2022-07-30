import React, { useEffect, useState, useContext } from "react";
import Note from "./note";
import axios from "axios";
import AddNote from "./addNote";
import { NoteContext } from "../contexts/context";
import { userContext } from "../contexts/context";
import CategoryMenu from "./category_menu";
import NoteSkeleton from "./note_skeleton";

function Home() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
          // setIsLoading(false);
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              margin: "auto",
            }}
          >
            <CategoryMenu />
          </div>
          <h1 className="title" style={{ margin: "auto", display: "flex" }}>
            Welcome to INOTE
          </h1>
        </div>
        {isLoading === true ? (
          <NoteSkeleton />
        ) : (
          <div>
            {notes.map((note, index) => (
              <div
                key={index}
                className="
            note-container"
              >
                <Note
                  content={note.note}
                  key={note.note_id}
                  note_id={note.note_id}
                  datetime={note.datetime}
                />
              </div>
            ))}
          </div>
        )}
        <AddNote color="action" />
      </div>
    </NoteContext.Provider>
  );
}

export default Home;
