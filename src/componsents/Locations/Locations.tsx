/** @format */

import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Location, { iLocation } from "../Location/Location";
import Navbar from "../Navbar/Navbar";
import "./Locations.scss";

function Locations() {
     const [errorMessage, setErrorMessage] = useState<string>();
     const [searchVal, setSearchVal] = useState<string>();
     const [locations, setLocations] = useState<iLocation[]>();
     const [isLoading, setIsLoading] = useState<boolean>(false);

     const searchLocation = async () => {
          if (searchVal) {
               const response = await fetch(
                    `https://rickandmortyapi.com/api/location/?name=${searchVal}`
               );
               const jsonRes = await response.json();
               console.log(jsonRes.results);
               setLocations(jsonRes.results);
          } else {
          }
     };

     const fetchLocations = async () => {
          const response = await fetch(
               "https://rickandmortyapi.com/api/location"
          );
          const jsonRes = await response.json();
          console.log(jsonRes.results);
          setLocations(jsonRes.results);
     };

     useEffect(() => {
          fetchLocations();
     }, []);
     return (
        <div className="locations">
           <Navbar isLoading={isLoading} />
           <h1>Browse locations.</h1>
           <form action="#" onSubmit={(e: React.SyntheticEvent) => {
               e.preventDefault()
               searchLocation()}}>
              <h3>Find a location</h3>
              <div className="field">
                 <p className="error-message">{errorMessage}</p>
                 <label htmlFor="character-name">Location Name</label>

                 <div className="search">
                    <input
                       type="text"
                       name="character-name"
                       id="character-name"
                       placeholder="Enter a location"
                       onChange={(e) => setSearchVal(e.target.value)}
                    />

                    <BiSearchAlt
                       className="search-btn"
                       onClick={searchLocation}
                    />
                 </div>
              </div>
           </form>

           <div className="locations-list">
              {locations?.map((location: iLocation, index: number) => (
                 <Location location={location} key={index} />
              ))}
           </div>
        </div>
     );
}

export default Locations;
