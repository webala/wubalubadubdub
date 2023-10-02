import React from 'react'
import {AiOutlineArrowRight} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import "./Home.scss"

function Home() {
  return (
       <div className="home">
            <div className="hero">
                 <h1 className='text-black'>wubalubadubdub!</h1>
                 <p>Browse Rick And Morty Characters, Locations and Episodes</p>
            </div>

            <div className="get-started">
                 <Link to={`/characters`}>
                      <button>
                           <p>Get Started</p>
                           <AiOutlineArrowRight className="icon" />
                      </button>
                 </Link>
            </div>
       </div>
  );
}

export default Home