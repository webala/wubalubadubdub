/** @format */

import { useEffect, useState, useRef } from "react";
import Episode, { iEpisode } from "../Episode/Episode";
import "./Episodes.scss";
import { BiSearchAlt } from "react-icons/bi";
import { BsLightningFill } from "react-icons/bs";
import { Zap } from "lucide-react";

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: iEpisode[];
}

function Episodes() {
  const [episodes, setEpisodes] = useState<iEpisode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<iEpisode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Filter states - only name and episode are available in API
  const [nameFilter, setNameFilter] = useState<string>("");
  const [episodeFilter, setEpisodeFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("air_date_newest");

  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchEpisodes = async (
    pageNum: number,
    name: string = "",
    episode: string = ""
  ) => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      if (name) params.append("name", name);
      if (episode) params.append("episode", episode);

      const endpoint = `https://rickandmortyapi.com/api/episode/?${params.toString()}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const jsonRes: ApiResponse = await response.json();

      if (pageNum === 1) {
        setEpisodes(jsonRes.results);
      } else {
        setEpisodes((prev) => [...prev, ...jsonRes.results]);
      }

      setHasMore(jsonRes.info.next !== null);
    } catch (error) {
      setIsError(true);
      if (pageNum === 1) {
        setEpisodes([]);
      }
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply sorting only (filtering is done by API)
  useEffect(() => {
    let result = [...episodes];

    // Sort episodes
    switch (sortBy) {
      case "air_date_newest":
        result.sort(
          (a, b) =>
            new Date(b.air_date).getTime() - new Date(a.air_date).getTime()
        );
        break;
      case "air_date_oldest":
        result.sort(
          (a, b) =>
            new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
        );
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredEpisodes(result);
  }, [episodes, sortBy]);

  // Reset filters
  const handleResetFilters = () => {
    setNameFilter("");
    setEpisodeFilter("");
    setSortBy("air_date_newest");
    setPage(1);
    fetchEpisodes(1, "", "");
  };

  // Apply filters - fetch from API when filters change
  const handleApplyFilters = () => {
    setPage(1);
    setEpisodes([]);
    fetchEpisodes(1, nameFilter, episodeFilter);
  };

  // Initial fetch
  useEffect(() => {
    fetchEpisodes(1);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // Don't set up observer if filters are active (API might not support pagination with filters well)
    if (nameFilter || episodeFilter) {
      return;
    }

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
  }, [hasMore, isLoading, nameFilter, episodeFilter]);

  // Fetch when page changes
  useEffect(() => {
    if (page > 1) {
      fetchEpisodes(page, nameFilter, episodeFilter);
    }
  }, [page]);

  if (isLoading && episodes.length === 0) {
    return (
      <div className="episodes">
        <div className="loading-state">Loading episodes...</div>
      </div>
    );
  }

  if (isError && episodes.length === 0) {
    return (
      <div className="episodes">
        <div className="error-state">Error loading episodes</div>
      </div>
    );
  }

  return (
    <div className="episodes">
      {/* Hero Section */}
      <div className="episodes-hero">
        <div className="hero-content">
          <h1 className="hero-title bangers-regular">
            <Zap className="icon" color="#00d563" />
            EXPLORE ALL EPISODES
            <Zap className="icon" color="#00d563" />
          </h1>
          <p className="hero-subtitle">
            Dive into every adventure, one episode at a time.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="episodes-container">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <h2 className="sidebar-title bangers-regular">FILTERS & SORT</h2>

          {/* Filter by Name */}
          <div className="filter-group">
            <label className="bangers-regular">FILTER BY NAME</label>
            <div className="search-input-wrapper">
              <BiSearchAlt className="search-icon" />
              <input
                type="text"
                placeholder="Search by episode name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleApplyFilters()}
                className="search-input"
              />
            </div>
          </div>

          {/* Filter by Episode Code */}
          <div className="filter-group">
            <label className="bangers-regular">FILTER BY EPISODE CODE</label>
            <div className="search-input-wrapper">
              <BiSearchAlt className="search-icon" />
              <input
                type="text"
                placeholder="e.g., S01E01"
                value={episodeFilter}
                onChange={(e) => setEpisodeFilter(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleApplyFilters()}
                className="search-input"
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <button onClick={handleApplyFilters} className="apply-button">
            Apply Filters
          </button>

          {/* Sort By */}
          <div className="filter-group">
            <label className="bangers-regular">SORT BY</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="air_date_newest">Air Date (Newest)</option>
              <option value="air_date_oldest">Air Date (Oldest)</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
            </select>
          </div>

          {/* Reset Button */}
          <button onClick={handleResetFilters} className="reset-button">
            Reset Filters
          </button>
        </aside>

        {/* Episodes Grid */}
        <main className="episodes-content">
          <h2 className="content-title bangers-regular">ALL EPISODES</h2>

          {filteredEpisodes.length === 0 ? (
            <div className="no-results">
              <p>No episodes found matching your filters.</p>
            </div>
          ) : (
            <>
              <div className="episodes-grid">
                {filteredEpisodes.map((episode: iEpisode, index: number) => (
                  <Episode episode={episode} key={`${episode.id}-${index}`} />
                ))}
              </div>

              {/* Infinite Scroll Trigger - Always render when hasMore and no filters */}
              {hasMore && !nameFilter && !episodeFilter && (
                <div
                  ref={observerTarget}
                  className="load-more-trigger"
                  style={{ minHeight: "50px" }}
                >
                  {isLoading && (
                    <p className="loading-more">Loading more episodes...</p>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Episodes;
