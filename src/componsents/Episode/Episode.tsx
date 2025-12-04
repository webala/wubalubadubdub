/** @format */

import React from "react";
import "./Episode.scss";

export interface iEpisode {
  id: number;
  name: string;
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  url: string;
}

interface iEpisodeProps {
  episode: iEpisode;
}

// Generate a consistent color based on episode ID
const getEpisodeColor = (id: number): string => {
  const colors = [
    "#FF6B9D",
    "#00D4AA",
    "#FFB84D",
    "#6B5EFF",
    "#FF5757",
    "#00C9FF",
    "#FFD93D",
    "#A05EFF",
    "#FF8C42",
    "#4ECDC4",
    "#FFD700",
    "#9B5DE5",
  ];
  return colors[id % colors.length];
};

function Episode({ episode }: iEpisodeProps) {
  const bgColor = getEpisodeColor(episode.id);

  return (
    <div className="episode-card">
      {/* Episode Image Placeholder */}
      <div className="episode-image">
        <img src="/episode.png" alt="episode" />
      </div>

      {/* Episode Content */}
      <div className="episode-content">
        <h3 className="episode-title bangers-regular">{episode.name}</h3>

        <div className="episode-meta">
          <span className="episode-code">{episode.episode}</span>
          <span className="episode-date">{episode.air_date}</span>
        </div>

        <p className="episode-description">
          {episode.characters.length > 0
            ? `Features ${episode.characters.length} characters in this interdimensional adventure.`
            : "Another wild adventure across the multiverse."}
        </p>
      </div>
    </div>
  );
}

export default Episode;
