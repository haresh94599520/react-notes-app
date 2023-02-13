import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ReactComponent as ArrorLeft } from "../assets/arrow-left.svg";

let cache = {};

function NoteDetails() {
  const [note, setNote] = useState(null);
  const isNew = useLocation().pathname.includes("create");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNew) {
      fetchNote();
    }
    console.log("is new", isNew, id);
  }, []);

  const fetchNote = async () => {
    console.log("fetching a note");
    if (cache[id]) {
      console.log("got it from cache");
      return setNote(cache[id]);
    }

    const res = await fetch(`http://localhost:3001/notes/${id}`);
    const json = await res.json();
    console.log("fetched a note");
    cache[id] = json;
    setNote(json);
  };

  const updateNote = async () => {
    cache[id] = null;
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
    navigate("/");
  };

  const createNote = async () => {
    await fetch(`http://localhost:3001/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        created: new Date(),
        updated: new Date(),
      }),
    });
    navigate("/");
  };

  const handleSUBMIT = () => {
    if (isNew && note && note.body.trim() !== "") {
      return createNote();
    }

    if (!isNew && note.body.trim() === "") {
      return deleteNote();
    }

    if (!isNew && cache[id] && cache[id].body !== note.body.trim()) {
      return updateNote();
    }

    navigate("/");
  };

  const deleteNote = async () => {
    cache[id] = null;
    await fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3 onClick={handleSUBMIT}>
          <ArrorLeft />
          <span style={{ fontSize: "2rem" }}>Done</span>
        </h3>
        {!isNew ? <button onClick={deleteNote}>Delete</button> : null}
      </div>

      {note || isNew ? (
        <textarea
          autoFocus
          name="note-content"
          value={note?.body ?? ""}
          onChange={(e) => setNote({ ...note, body: e.currentTarget.value })}
        ></textarea>
      ) : null}
    </div>
  );
}

export default NoteDetails;
