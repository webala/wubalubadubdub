/** @format */

import React, { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai'



function Navbar() {

     const [isActive, setIsActive] = useState<boolean>(false)
     return (
        <div className="navbar">
           <Link to={`/`}>
              {" "}
              <h1>wubalubadubdub</h1>
           </Link>

           <div className={isActive ? "nav-items active" : "nav-items"}>
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

           <div className="menu">
              {isActive ? (
                 <AiOutlineMenuUnfold
                    className="icon"
                    onClick={() => setIsActive(false)}
                 />
              ) : (
                 <AiOutlineMenuFold
                    className="icon"
                    onClick={() => setIsActive(true)}
                 />
              )}
           </div>

           {/* {isLoading && <Progress />} */}
        </div>
     );
}

export default Navbar;
