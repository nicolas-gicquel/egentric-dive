import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>
        <Link to={`/rgpd`} className="lienFooter">
          RGPD
        </Link>{" "}
        -{" "}
        <Link to={`/mentionlegales`} className="lienFooter">
          Mentions légales
        </Link>
      </p>
    </div>
  );
};

export default Footer;
