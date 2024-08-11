import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to="https://github.com/cody-barker">
        <span>Developed by </span>
        <span className="blue">Cody Barker</span>
        <span> 2024</span>
      </Link>
    </div>
  );
}

export default Footer;
