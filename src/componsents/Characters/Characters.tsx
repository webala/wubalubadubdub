/** @format */

import React, { useEffect, useState } from "react";
import Character from "../Character/Character";
import { iCharacter } from "../Character/Character";
import { BiSearchAlt } from "react-icons/bi";
import "./Characters.scss";
import Navbar from "../Navbar/Navbar";

function Characters() {
     const [characters, setCharacters] = useState<object[]>();
     const [searchVal, setSearchVal] = useState<string>();
     const [errorMessage, setErrorMessage] = useState<string>();
     const [isLoading, setIsLoading] = useState<boolean>(false);

     const fetchCharacters = async () => {
          setIsLoading(true);
          const response = await fetch(
               "https://rickandmortyapi.com/api/character"
          );
          const jsonRes = await response.json();
          console.log(jsonRes.results);
          setCharacters(jsonRes.results);
          setIsLoading(false);
     };

     const searchCharacter = async () => {
          setIsLoading(true);
          if (searchVal) {
               const response = await fetch(
                    `https://rickandmortyapi.com/api/character/?name=${searchVal}`
               );
               const jsonRes = await response.json();
               console.log(jsonRes.results);
               setCharacters(jsonRes.results);
          } else {
          }
          setIsLoading(false);
     };

     useEffect(() => {
          fetchCharacters();
     }, []);
     return (
          <div className="characters">
               <Navbar isLoading={isLoading} />
               <h1>Browse your favourite characters.</h1>
               <form
                    action="#"
                    onSubmit={(e) => {
                         e.preventDefault();
                         searchCharacter();
                    }}
               >
                    <h3>Find a character</h3>
                    <div className="field">
                         <p className="error-message">{errorMessage}</p>
                         <label htmlFor="character-name">Character Name</label>

                         <div className="search">
                              <input
                                   type="text"
                                   name="character-name"
                                   id="character-name"
                                   placeholder="Enter a character name"
                                   onChange={(e) =>
                                        setSearchVal(e.target.value)
                                   }
                              />

                              <BiSearchAlt
                                   className="search-btn"
                                   onClick={searchCharacter}
                              />
                         </div>
                    </div>
               </form>

               <div className="characters-list">
                    {characters?.map((character: iCharacter, index: number) => (
                         <Character character={character} index={index} />
                    ))}
               </div>
          </div>
     );
}

export default Characters;
