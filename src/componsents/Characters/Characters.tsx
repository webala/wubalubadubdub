/** @format */

import React, { useEffect, useState } from "react";
import Character from "../Character/Character";
import { iCharacter } from "../Character/Character";
import { BiSearchAlt } from "react-icons/bi";
import "./Characters.scss";
import Navbar from "../Navbar/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import useDebouce from "../../hooks/useDebounce";

function Characters() {
     const [searchVal, setSearchVal] = useState<string>();
     const [errorMessage, setErrorMessage] = useState<string>();
     // const [isLoading, setIsLoading] = useState<boolean>(false);

     const fetchCharacters = async (searchVal?: string) => {
          let endpoint;
          if (searchVal) {
               endpoint = `https://rickandmortyapi.com/api/character/?name=${searchVal}`
          } else {
               endpoint = "https://rickandmortyapi.com/api/character"
          }
          const response = await axios(
               endpoint
          );
          return response.data;          
     };

     const value = useDebouce(searchVal);

     const {data, isLoading, isSuccess, isError} = useQuery(['characters', value], () => fetchCharacters(value))

     useEffect(() => {
     }, [value]);
     if (isLoading) {
          return <p>Loading</p>
     }
     if (isError) {
          return <p>Error</p>
     }
     console.log(data)
     return (
          <div className="characters">
               <h1>Browse your favourite characters.</h1>
               
               {isLoading && <p>Loading</p>}
               {isSuccess && <div className="characters-list">
                    {data?.results.map((character: iCharacter, index: number) => (
                         <Character character={character} key={index} />
                    ))}
               </div>}
          </div>
     );
}

export default Characters;
