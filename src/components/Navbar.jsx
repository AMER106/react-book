import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "#282c34",
      }}
    >
      <Link style={{ color: "white" }} to="/">
        Home
      </Link>

      <Link style={{ color: "white" }} to="/dashboard">
        Dashboard
      </Link>

      <Link style={{ color: "white" }} to="/settings">
        Settings
      </Link>
    </nav>
  );
}