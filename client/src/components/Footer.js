import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Link to="https://github.com/cody-barker">
        <span>Developed by </span>
        <span className="blue">Cody Barker 2024</span>
      </Link>
    </footer>
  );
}

export default Footer;
