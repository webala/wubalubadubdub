/** @format */

import React from "react";
import "./Location.scss";
import { MapPin, Users } from "lucide-react";

export interface iLocation {
  id: number;
  name: string;
  type: string;
  created: string;
  dimension: string;
  residents: string[];
  url: string;
}

interface iLocationProps {
  location: iLocation;
}

// Generate a consistent image based on location ID
const getLocationImage = (id: number): string => {
  const images = [
    "/location1.png",
    "/location2.png",
    "/location3.png",
    "/location4.png",
    "/location5.png",
    "/location6.png",
    "/location7.png",
    "/location8.png",
    "/location9.png",
  ];
  return images[id % images.length];
};

// Get type badge color
const getTypeColor = (type: string): string => {
  const typeColors: { [key: string]: string } = {
    Planet: "#00d563",
    "Space station": "#a855f7",
    Microverse: "#f59e0b",
    TV: "#ef4444",
    Resort: "#8b5cf6",
    "Fantasy town": "#ec4899",
    Dream: "#06b6d4",
    Dimension: "#6366f1",
    Menagerie: "#f97316",
  };
  return typeColors[type] || "#6b7280";
};

function Location({ location }: iLocationProps) {
  const locationImage = getLocationImage(location.id);
  const typeColor = getTypeColor(location.type);

  return (
    <div className="location-card">
      {/* Location Image */}
      <div className="location-image">
        <img src={locationImage} alt={location.name} />
      </div>

      {/* Location Info */}
      <div className="location-info">
        <h3 className="location-name bangers-regular">{location.name}</h3>

        <span className="type-badge" style={{ backgroundColor: typeColor }}>
          {location.type}
        </span>

        <div className="location-meta">
          <div className="meta-item">
            <MapPin size={14} color="#00b854" />
            <span className="text-truncate meta-item" title={location.dimension}>
              {location.dimension}
            </span>
          </div>

          <div className="meta-item residents">
            <Users size={14} color="#00b854" />
            <span className="meta-item residents">
              {location.residents.length} Residents
            </span>
          </div>
        </div>

        {/* <button className="explore-button">Explore Details</button> */}
      </div>
    </div>
  );
}

export default Location;
