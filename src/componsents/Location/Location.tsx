/** @format */

import React, { useState } from "react";
import "./Location.scss";

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

function Location({ location }: iLocationProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <div
      className="location"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <h1>{location.name}</h1>
      <div className={showDetails ? `details active` : `details`}>
        <p>Dimension: {location.dimension}</p>
        <p>Type: {location.type}</p>
      </div>
    </div>
  );
}

export default Location;
