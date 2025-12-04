/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import { MapPin, Tv, UsersRound } from "lucide-react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

function Home() {
  const [featuredCharacter, setFeaturedCharacter] = useState<Character | null>(
    null
  );

  useEffect(() => {
    // Fetch Rick Sanchez (character ID 1)
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/character/1"
        );
        setFeaturedCharacter(response.data);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };
    fetchCharacter();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title bangers-regular">WUBBA LUBBA DUB-DUB!</h1>
          <h2 className="hero-subtitle bangers-regular">
            YOUR GATEWAY TO THE MULTIVERSE.
          </h2>
          <p className="hero-description bangers-regular">
            Dive deep into the infinite dimensions of Rick and Morty. Explore
            every episode,
            <br />
            character, and location.
          </p>
          <div className="hero-buttons">
            <Link to="/episodes">
              <button className="btn-primary bangers-regular">
                EXPLORE EPISODES
              </button>
            </Link>
            <Link to="/characters">
              <button className="btn-primary bangers-regular">
                MEET CHARACTERS
              </button>
            </Link>
            <Link to="/locations">
              <button className="btn-primary bangers-regular">
                DISCOVER LOCATIONS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore the Dimensions */}
      <section className="explore-section">
        <h2 className="section-title bangers-regular">
          EXPLORE THE DIMENSIONS
        </h2>
        <div className="explore-cards">
          <div className="explore-card">
            <div className="card-icon">
              <Tv className="icon" color="#00d563" />
            </div>
            <h3 className="bangers-regular">EPISODES</h3>
            <p>
              Relive every adventure, from the first to the strangest of
              episodes.
            </p>
          </div>
          <div className="explore-card">
            <div className="card-icon">
              <UsersRound className="icon" color="#00d563" />
            </div>
            <h3 className="bangers-regular">CHARACTERS</h3>
            <p>From Ricks to Mortys and everything in between.</p>
          </div>
          <div className="explore-card">
            <div className="card-icon">
              <MapPin className="icon" color="#00d563" />
            </div>
            <h3 className="bangers-regular">LOCATIONS</h3>
            <p>
              Wander through the most bizarre and familiar places in the cosmos.
            </p>
          </div>
        </div>
      </section>

      {/* Character Spotlight */}
      {featuredCharacter && (
        <section className="spotlight-section">
          <h2 className="section-title bangers-regular">CHARACTER SPOTLIGHT</h2>
          <div className="spotlight-card">
            <img
              src={featuredCharacter.image}
              alt={featuredCharacter.name}
              className="spotlight-image"
            />
            <h3 className="spotlight-name bangers-regular">
              {featuredCharacter.name.toUpperCase()}
            </h3>
            <div className="spotlight-badges">
              <span className="badge badge-species">
                Species: {featuredCharacter.species}
              </span>
              <span className="badge badge-status">
                {featuredCharacter.status}
              </span>
            </div>
            <Link to="/characters">
              <button className="btn-spotlight bangers-regular">
                View Full Character Profile
              </button>
            </Link>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="about-section" id="about">
        <h2 className="section-title bangers-regular">
          ABOUT THE RICK AND MORTY EXPLORER
        </h2>
        <p className="about-text">
          The Rick and Morty Explorer is your ultimate companion for navigating
          the complex and hilarious universe. It aims to provide accurate and
          comprehensive information, all wrapped in an interface that captures
          the irreverent spirit of the show. Get ready for an adventure without
          the risk of interdimensional parasites!
        </p>
      </section>

      {/* Footer */}
      {/* <footer className="footer">
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
          <a href="#" aria-label="X">
            <FaTwitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        <p className="footer-copyright">
          © 2025 Rick and Morty Explorer. All rights reserved. Not affiliated
          with Adult Swim or Warner Bros.
        </p>
        <p className="footer-made-with">Made with ❤️ by a fan</p>
      </footer> */}
    </div>
  );
}

export default Home;
