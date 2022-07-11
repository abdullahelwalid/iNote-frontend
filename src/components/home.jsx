import React, { useEffect, useState } from "react";
import Note from "./note";
import axios from "axios";

const notes1 = [
  {
    note:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 1,
  },
  {
    note:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 2,
  },
  {
    note:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 3,
  },
  {
    note:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    id: 4,
  },
  {
    note: "is simply dummy text of the printing and typesetting industry. ",
    id: 5,
  },
];

function Home() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/note?user_id=usertest33")
      .then((resp) => {
        console.log(resp);
        setNotes(resp.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  },[]);

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <h1 className="title">Welcome to INOTE</h1>
      {notes.map((note) => (
        <div
          className="
            note-container"
        >
          <Note content={note.note} key={note.note_id} />
        </div>
      ))}
    </div>
  );
}

export default Home;
