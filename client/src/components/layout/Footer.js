import React from "react";
import "./Footer.scss";

const Footer = () => (
  <footer className="footer">
    <p className="footer__copyright">
      Copyright &copy; {new Date().getFullYear()} CodeCareer
    </p>
    <p className="footer__created">Created by Ahmed Ben Gayess</p>
  </footer>
);

export default Footer;
