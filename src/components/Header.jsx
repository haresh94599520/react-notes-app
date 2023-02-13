function Header({ theme, setTheme }) {
  return (
    <div className="app-header">
      <h1>Notes List</h1>
      <button className="theme-toggle" onClick={() => setTheme(!theme)}>
        {theme ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default Header;
