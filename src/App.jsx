import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./reset.css";
import "./App.css";

import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteDetails from "./components/NoteDetails";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <BrowserRouter>
      <div className="container" data-theme={theme ? "dark" : "light"}>
        <div className="app">
          <Header theme={theme} setTheme={setTheme} />

          <Routes>
            <Route path="/notes/create" element={<NoteDetails />} />
            <Route path="/notes/:id" element={<NoteDetails />} />
            <Route path="/" element={<NotesList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
