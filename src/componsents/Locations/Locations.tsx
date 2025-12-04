/** @format */

import React, { useEffect, useState, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import Location, { iLocation } from "../Location/Location";
import Navbar from "../Navbar/Navbar";
import "./Locations.scss";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: iLocation[];
}

function Locations() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [searchVal, setSearchVal] = useState<string>();
  const [locations, setLocations] = useState<iLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchLocations = async (pageNum: number, searchQuery?: string) => {
    setIsLoading(true);
    setIsError(false);
    try {
      let endpoint;
      if (searchQuery) {
        endpoint = `https://rickandmortyapi.com/api/location/?name=${searchQuery}&page=${pageNum}`;
      } else {
        endpoint = `https://rickandmortyapi.com/api/location/?page=${pageNum}`;
      }
      const response = await fetch(endpoint);
      const jsonRes: ApiResponse = await response.json();

      if (pageNum === 1) {
        setLocations(jsonRes.results);
      } else {
        setLocations((prev) => [...prev, ...jsonRes.results]);
      }

      setHasMore(jsonRes.info.next !== null);
    } catch (error) {
      setIsError(true);
      if (pageNum === 1) {
        setLocations([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and fetch when search value changes
  useEffect(() => {
    setPage(1);
    setLocations([]);
    setHasMore(true);
    fetchLocations(1, searchVal);
  }, [searchVal]);

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
      fetchLocations(page, searchVal);
    }
  }, [page]);

  if (isLoading && locations.length === 0) {
    return <p>Loading</p>;
  }

  if (isError && locations.length === 0) {
    return <p>Error loading locations</p>;
  }

  return (
    <div className="locations">
      <h1>Browse locations.</h1>

      <div className="locations-list">
        {locations.map((location: iLocation, index: number) => (
          <Location location={location} key={`${location.id}-${index}`} />
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

      {!hasMore && locations.length > 0 && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>No more locations to load</p>
        </div>
      )}
    </div>
  );
}

export default Locations;
