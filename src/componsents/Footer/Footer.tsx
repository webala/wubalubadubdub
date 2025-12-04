import { FaGithub, FaGlobe, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4 className="bangers-regular">site map</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/episodes">Episodes</Link>
            </li>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/locations">Locations</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="bangers-regular">ABOUT</h4>
          <ul>
            <li>
              <a href="#about">Rick and Morty</a>
            </li>
            <li>
              <a href="https://rickandmortyapi.com/" target="blank">
                API
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-social">
        <a href="https://github.com/webala" aria-label="GitHub" target="_blank">
          <FaGithub />
        </a>
        <a href="https://webala.dev" aria-label="Website" target="_blank">
          <FaGlobe />
        </a>

        <a href="https://x.com/Webbie1001" aria-label="X">
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-webala-8b4992184/"
          aria-label="LinkedIn"
          target="blank"
        >
          <FaLinkedin />
        </a>
      </div>
      <p className="footer-copyright">
        Not affiliated with Adult Swim or Warner Bros.
      </p>
      <p className="footer-made-with">
        Developed by{" "}
        <a href="https://webala.dev" target="blank">
          webd
        </a>
      </p>
    </footer>
  );
};

export default Footer;
