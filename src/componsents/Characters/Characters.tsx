/** @format */

import { useEffect, useState, useRef, useCallback } from "react";
import Character from "../Character/Character";
import { iCharacter } from "../Character/Character";
import "./Characters.scss";
import axios from "axios";
import useDebouce from "../../hooks/useDebounce";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: iCharacter[];
}

function Characters() {
  const [searchVal, setSearchVal] = useState<string>();
  const [characters, setCharacters] = useState<iCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerTarget = useRef<HTMLDivElement>(null);
  const value = useDebouce(searchVal);

  const fetchCharacters = async (pageNum: number, searchQuery?: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      let endpoint;
      if (searchQuery) {
        endpoint = `https://rickandmortyapi.com/api/character/?name=${searchQuery}&page=${pageNum}`;
      } else {
        endpoint = `https://rickandmortyapi.com/api/character/?page=${pageNum}`;
      }
      const response = await axios.get<ApiResponse>(endpoint);

      if (pageNum === 1) {
        setCharacters(response.data.results);
      } else {
        setCharacters((prev) => [...prev, ...response.data.results]);
      }

      setHasMore(response.data.info.next !== null);
    } catch (error) {
      setIsError(true);
      if (pageNum === 1) {
        setCharacters([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and fetch when search value changes
  useEffect(() => {
    setPage(1);
    setCharacters([]);
    setHasMore(true);
    fetchCharacters(1, value);
  }, [value]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading]);

  // Fetch when page changes (but not on initial render)
  useEffect(() => {
    if (page > 1) {
      fetchCharacters(page, value);
    }
  }, [page]);

  if (isLoading && characters.length === 0) {
    return <p>Loading</p>;
  }

  if (isError && characters.length === 0) {
    return <p>Error loading characters</p>;
  }

  return (
    <div className="characters">
      <h1>Browse your favourite characters.</h1>

      <div className="characters-list">
        {characters.map((character: iCharacter, index: number) => (
          <Character character={character} key={`${character.id}-${index}`} />
        ))}
      </div>

      {hasMore && (
        <div
          ref={observerTarget}
          style={{ padding: "20px", textAlign: "center" }}
        >
          {isLoading && <p>Loading more...</p>}
        </div>
      )}

      {!hasMore && characters.length > 0 && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>No more characters to load</p>
        </div>
      )}
    </div>
  );
}

export default Characters;
