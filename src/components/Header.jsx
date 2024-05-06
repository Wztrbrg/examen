import { Link } from "react-router-dom";
import "./header.css"

function Header() {
  return (
    <header>
      <Link to={"/"} className="logo"></Link>
      <h2>Förvandla dina bilder till Lego-mästerverk</h2>
    </header>
  )
}

export default Header;