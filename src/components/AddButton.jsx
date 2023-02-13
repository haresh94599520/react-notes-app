import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add.svg";

function AddButton() {
  return (
    <Link to="/notes/create" className="floating-button">
      <AddIcon />
    </Link>
  );
}

export default AddButton;
