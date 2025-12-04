/** @format */

import { useEffect, useState, useRef } from "react";
import Character from "../Character/Character";
import { iCharacter } from "../Character/Character";
import "./Characters.scss";
import { BiSearchAlt } from "react-icons/bi";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

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
  const [characters, setCharacters] = useState<iCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [speciesFilters, setSpeciesFilters] = useState<string[]>([]);

  // Accordion states
  const [statusOpen, setStatusOpen] = useState<boolean>(true);
  const [speciesOpen, setSpeciesOpen] = useState<boolean>(true);

  const fetchCharacters = async (
    pageNum: number,
    name: string = "",
    status: string[] = [],
    species: string[] = []
  ) => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      if (name) params.append("name", name);

      // API only supports single status filter, so use first one
      if (status.length > 0) params.append("status", status[0].toLowerCase());

      // API only supports single species filter, so use first one
      if (species.length > 0) params.append("species", species[0]);

      const endpoint = `https://rickandmortyapi.com/api/character/?${params.toString()}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const jsonRes: ApiResponse = await response.json();

      if (pageNum === 1) {
        setCharacters(jsonRes.results);
      } else {
        setCharacters((prev) => [...prev, ...jsonRes.results]);
      }

      setHasMore(jsonRes.info.next !== null);
    } catch (error) {
      setIsError(true);
      if (pageNum === 1) {
        setCharacters([]);
      }
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle status checkbox change
  const handleStatusChange = (status: string) => {
    setStatusFilters((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        // Only allow one status at a time (API limitation)
        return [status];
      }
    });
  };

  // Handle species checkbox change
  const handleSpeciesChange = (species: string) => {
    setSpeciesFilters((prev) => {
      if (prev.includes(species)) {
        return prev.filter((s) => s !== species);
      } else {
        // Only allow one species at a time (API limitation)
        return [species];
      }
    });
  };

  // Apply filters
  const handleApplyFilters = () => {
    setPage(1);
    setCharacters([]);
    fetchCharacters(1, nameFilter, statusFilters, speciesFilters);
  };

  // Reset filters
  const handleResetFilters = () => {
    setNameFilter("");
    setStatusFilters([]);
    setSpeciesFilters([]);
    setPage(1);
    fetchCharacters(1, "", [], []);
  };

  // Load more characters
  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCharacters(nextPage, nameFilter, statusFilters, speciesFilters);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchCharacters(1);
  }, []);

  // if (isLoading && characters.length === 0) {
  //   return (
  //     <div className="characters">
  //       <div className="loading-state">Loading characters...</div>
  //     </div>
  //   );
  // }

  if (isError && characters.length === 0) {
    return (
      <div className="characters">
        <div className="error-state">Error loading characters</div>
      </div>
    );
  }

  const statusOptions = ["Alive", "Dead", "Unknown"];
  const speciesOptions = [
    "Human",
    "Alien",
    "Humanoid",
    "Robot",
    "Mythological Creature",
    "Animal",
    "Cronenberg",
  ];

  return (
    <div className="characters">
      {/* Search Bar */}
      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" color="#6e6a6aff"/>
          <input
            type="text"
            placeholder="Search characters by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleApplyFilters()}
            className="search-input"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="characters-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h2 className="sidebar-title bangers-regular">FILTERS</h2>

          {/* Status Filter */}
          <div className="filter-section">
            <button
              className="filter-header"
              onClick={() => setStatusOpen(!statusOpen)}
            >
              <span className="bangers-regular filter-header">STATUS</span>
              {statusOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {statusOpen && (
              <div className="filter-options">
                {statusOptions.map((status) => (
                  <label key={status} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes(status)}
                      onChange={() => handleStatusChange(status)}
                    />
                    <span className="checkbox-label">{status}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Species Filter */}
          <div className="filter-section">
            <button
              className="filter-header"
              onClick={() => setSpeciesOpen(!speciesOpen)}
            >
              <span className="bangers-regular filter-header">SPECIES</span>
              {speciesOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
            {speciesOpen && (
              <div className="filter-options">
                {speciesOptions.map((species) => (
                  <label key={species} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={speciesFilters.includes(species)}
                      onChange={() => handleSpeciesChange(species)}
                    />
                    <span className="checkbox-label">{species}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Apply Filters Button */}
          <button onClick={handleApplyFilters} className="apply-button">
            Apply Filters
          </button>

          {/* Reset Button */}
          <button onClick={handleResetFilters} className="reset-button">
            Reset Filters
          </button>
        </aside>

        {/* Characters Grid */}
        <main className="characters-content">
          {isLoading && (
            <div className="characters-grid">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="character-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text skeleton-title"></div>
                  <div className="skeleton-text skeleton-subtitle"></div>
                </div>
              ))}
            </div>
          )}
          {characters.length === 0 ? (
            <div className="no-results">
              <p>No characters found matching your filters.</p>
            </div>
          ) : (
            <>
              <div className="characters-grid">
                {characters.map((character: iCharacter, index: number) => (
                  <Character
                    character={character}
                    key={`${character.id}-${index}`}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="load-more-container">
                  <button
                    onClick={handleLoadMore}
                    className="load-more-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Load More Characters"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Characters;
