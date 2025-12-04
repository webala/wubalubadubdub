/** @format */

import React from "react";
import "./Character.scss";

interface iOrigin {
  name: string;
  url: string;
}

interface iLocation {
  name: string;
  url: string;
}

export interface iCharacter {
  name: string;
  created: string;
  status: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: iLocation;
  origin: iOrigin;
  species: string;
  type: string;
}

interface iCharacterProps {
  character: iCharacter;
}

function Character({ character }: iCharacterProps) {
  // Get status badge color
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "alive":
        return "#00d563";
      case "dead":
        return "#ff5757";
      case "unknown":
        return "#9ca3af";
      default:
        return "#9ca3af";
    }
  };

  return (
    <div className="character-card">
      {/* Character Image */}
      <div className="character-image">
        <img src={character.image} alt={character.name} />

        {/* Overlay Details - Shown on Hover */}
        <div className="character-overlay">
          <div className="character-details">
            {/* Gender */}
            <div className="detail-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
                <path d="M12 6v12M9 9h6" />
              </svg>
              <span>{character.gender}</span>
            </div>

            {/* Origin */}
            <div className="detail-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-truncate" title={character.origin.name}>
                Origin: {character.origin.name}
              </span>
            </div>

            {/* Location */}
            <div className="detail-item">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-truncate" title={character.location.name}>
                Location: {character.location.name}
              </span>
            </div>

            {/* Episodes */}
            <div className="detail-item episodes-count">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
              <span>
                {character.episode.length} Episode
                {character.episode.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Character Info - Always Visible */}
      <div className="character-info">
        <h3 className="character-name bangers-regular">{character.name}</h3>

        <div className="character-meta-primary">
          <div className="species-info">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span className="species-info">{character.species}</span>
          </div>

          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor(character.status) }}
          >
            {character.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Character;
