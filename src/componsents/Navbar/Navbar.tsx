/** @format */

import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { Progress } from "@chakra-ui/react";

interface iNavProps {
     isLoading: boolean;
}

function Navbar({isLoading}: iNavProps) {
     return (
          <div className="navbar">
               <Link to={`/`}>
                    {" "}
                    <h1>wubalubadubdub</h1>
               </Link>

               <div className="nav-items">
                    <Link className="link" to={`/characters`}>
                         Characters
                    </Link>
                    <Link className="link" to={`/locations`}>
                         Locations
                    </Link>
                    <Link className="link" to={`/episodes`}>
                         Episodes
                    </Link>
               </div>

               {isLoading && <Progress colorScheme={`teal`} size="xs" isIndeterminate />}
          </div>
     );
}

export default Navbar;
