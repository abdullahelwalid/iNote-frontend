import React, { useEffect, useState, useContext } from "react";
import Note from "./note";
import axios from "axios";
import AddNote from "./addNote";
import { NoteContext } from "../contexts/context";
import { userContext } from "../contexts/context";
import CategoryMenu from "./category_menu";
import NoteSkeleton from "./note_skeleton";
import { IconButton, TextField } from "@mui/material";
import { Message } from "./feedback";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function Home() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCounter, setShowCounter] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryCounter, setCategoryCounter] = useState(0);
  const [show, setShow] = useState(false);
  const {
    authenticated,
    setAuthenticated,
    setFeedbackMessage,
    setError,
    setCollapse,
    userId,
    token,
    URL,
  } = useContext(userContext);

  const addCategory = () => {
    setShowCounter(false);
    if (categoryCounter > 0 && authenticated) {
      axios
        .post(
          `${URL}/category`,
          {
            user_id: userId,
            category: category,
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((resp) => {
          setCategories((prevItems) => [...prevItems, resp.data]);
          setCategory("");
          setCategoryCounter(0);
          setShow(true);
          setShowCounter(false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            return setAuthenticated(false);
          }
          setFeedbackMessage("You have category with the same name");
          setError(true);
          setCollapse(true);
        });
    }
  };
  useEffect(() => {
    if (authenticated) {
      axios
        .get(`${URL}/note?user_id=`.concat(userId), {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((resp) => {
          setNotes(resp.data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            return setAuthenticated(false);
          }
          setFeedbackMessage("An error has occurred");
          setError(true);
          setCollapse(true);
        });

      axios
        .get(`${URL}/category?user_id=`.concat(userId), {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((resp) => {
          setCategories(resp.data);
          console.log(resp.data);
          setIsLoading(false);
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
        categories,
        setCategories,
      }}
    >
      <Message show={show} category={category} />
      <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              margin: "auto",
            }}
          >
            <CategoryMenu />
          </div>
          <div>
            {/* <div style={{ display: "flex", textAlign: "center" }}>
              <TextField
                id="outlined-textarea"
                label="Add category"
                placeholder="Add category"
                size="small"
                value={category}
                onChange={(event) => {
                  setCategoryCounter(event.target.value.length);
                  if (event.target.value.length <= 24) {
                    setCategory(event.target.value);
                  }
                }}
                onBlur={addCategory}
                onFocus={() => {
                  setShowCounter(true);
                }}
              />
              <div
                style={{
                  position: "absolute",
                  marginLeft: "160px",
                }}
              >
                <IconButton
                  onClick={() => {
                    setCategory("");
                    setCategoryCounter(0);
                    setShowCounter(false);
                  }}
                >
                  <ClearOutlinedIcon />
                </IconButton>
              </div>
            </div> */}
            <div style={{ width: "100%" }}>
              {showCounter && (
                <p
                  style={{
                    fontSize: "10px",
                    backgroundColor: "inherit",
                    width: "fit-content",
                    float: "right",
                  }}
                >
                  {categoryCounter}/25
                </p>
              )}
            </div>
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
