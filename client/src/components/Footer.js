import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <span className="footer__span">Developed by </span>
      <Link className="footer__link" to="https://github.com/cody-barker">
        <span className="footer__link footer__link--span">Cody Barker</span>
      </Link>
      <span className="footer__span"> 2024</span>
    </div>
  );
}

export default Footer;
