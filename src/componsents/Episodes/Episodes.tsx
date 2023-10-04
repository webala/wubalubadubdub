import { useEffect, useState } from 'react'
import Episode, { iEpisode } from '../Episode/Episode';
import "./Episodes.scss"

function Episodes() {

     const [episodes, setEpisodes] = useState<iEpisode[]>()
     const [isLoading, setIsLoading] = useState<boolean>(false)

     const fetchEpisodes = async () => {
          const response = await fetch(
               "https://rickandmortyapi.com/api/episode"
          );
          const jsonRes = await response.json();
          console.log(jsonRes.results);
          setEpisodes(jsonRes.results);
     }

     useEffect(() => {
          fetchEpisodes()
     }, [])
  return (
       <div className='episodes'>
            <h1>Episodes</h1>
            <div className="episodes-list">
                 {episodes?.map((episode: iEpisode, index: number) => (
                      <Episode episode={episode} key={index} />
                 ))}
            </div>
       </div>
  );
}

export default Episodes