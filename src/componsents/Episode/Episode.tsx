/** @format */

import React, { useState } from "react";
import "./Episode.scss";

export interface iEpisode {
     name: string;
     air_date: string;
     characters: string[];
     created: string;
     episode: string;
     url: string;
}

interface iEpisodeProps {
     episodes: iEpisode;
}

function Episode({ episode }: iEpisodeProps) {
     const [showDetails, setShowDetails] = useState<boolean>(false);
     return (
          <div
               className="episode"
               onMouseEnter={() => setShowDetails(true)}
               onMouseLeave={() => setShowDetails(false)}
          >
               <h1>
                    {episode.name} - {episode.episode}
               </h1>
               <div className={showDetails ? `details active` : `details`}>
                    <p>Created on {episode.created}</p>
                    <p>Aired on {episode.air_date}</p>
               </div>
          </div>
     );
}

export default Episode;
