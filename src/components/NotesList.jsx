import { useEffect, useState } from "react";
import AddButton from "./AddButton";
import ListItem from "./ListItem";

function NotesList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    requestNotes();
  }, []);

  const requestNotes = async () => {
    console.log("fetching notes");
    const res = await fetch("http://localhost:3001/notes");
    const json = await res.json();
    console.log("fetched notes");
    setNotes(json);
  };

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes?.length ?? 0} notes</p>
      </div>

      <div className="notes-list">
        {notes
          ? notes.map((note) => <ListItem key={note.id} note={note} />)
          : null}
      </div>

      <AddButton />
    </div>
  );
}

export default NotesList;
