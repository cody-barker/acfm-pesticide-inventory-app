import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to="https://github.com/cody-barker">
        <span className="footer__span">Developed by </span>
        <span className="footer__link">Cody Barker</span>
        <span className="footer__span"> 2024</span>
      </Link>
    </div>
  );
}

export default Footer;
