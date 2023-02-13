import { Link } from "react-router-dom";

function ListItem({ note }) {
  const [title, ...rest] = note.body.split("\n");

  return (
    <Link to={"/notes/" + note.id}>
      <div className="notes-list-item">
        <h3 className="note-body-preview">{title}</h3>
        <p>
          <span className="note-body-preview">{rest}</span>
          {new Date(note.updated).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default ListItem;
