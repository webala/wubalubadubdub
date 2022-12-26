import React, {useState} from 'react'
import './Character.scss'

export interface iCharacter {
     name: string;
     created: string;
     status: string;
     episode: string[];
     gender: string;
     id: number;
     image: string;
     location: object;
     origin: object;
     species: string;
}

interface iCaharacterProps {
     character: iCharacter
}



function Character({ character }: iCaharacterProps) {

     const [showInfo, setShowInfo] = useState<boolean>(false)
     return (
          <div className="character" onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
               <div className="overview">
                    <div className="profile">
                         <img src={character.image} alt={character.name} />
                         <h1>{character.name}</h1>
                    </div>

                    <p>Origin: {character.origin.name}</p>
               </div>
               <div className={showInfo ? `more-info active` : `more-info`}>
                    <p>Species: {character.species}</p>
                    <p>Locaion: {character.location.name}</p>
                    <p>Status: {character.status}</p>
               </div>
          </div>
     );
}

export default Character