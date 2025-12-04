/** @format */

import { useEffect, useState } from "react";
import Location, { iLocation } from "../Location/Location";
import "./Locations.scss";
import { Search, Grid3x3, List } from "lucide-react";

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
  const [locations, setLocations] = useState<iLocation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Filter states
  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [dimensionFilter, setDimensionFilter] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "grouped">("grid");

  const fetchLocations = async (
    pageNum: number,
    name: string = "",
    type: string = "",
    dimension: string = ""
  ) => {
    setIsLoading(true);
    setIsError(false);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", pageNum.toString());
      if (name) params.append("name", name);
      if (type && type !== "all") params.append("type", type);
      if (dimension && dimension !== "all")
        params.append("dimension", dimension);

      const endpoint = `https://rickandmortyapi.com/api/location/?${params.toString()}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

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
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters
  const handleApplyFilters = () => {
    setPage(1);
    setLocations([]);
    fetchLocations(1, nameFilter, typeFilter, dimensionFilter);
  };

  // Load more locations
  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLocations(nextPage, nameFilter, typeFilter, dimensionFilter);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchLocations(1);
  }, []);

  if (isError && locations.length === 0) {
    return (
      <div className="locations">
        <div className="error-state">Error loading locations</div>
      </div>
    );
  }

  return (
    <div className="locations">
      {/* Hero Section */}
      <div className="locations-hero">
        <h1 className="hero-title bangers-regular">
          EXPLORE THE MULTIVERSE LOCATIONS
        </h1>
        <p className="hero-subtitle bangers-regular">
          Journey through the bizarre and fantastic locales from the Rick and
          Morty universe.
          <br />
          Discover planets, dimensions, and other cosmic wonders.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search className="search-icon" color="#6e6a6aff" />
          <input
            type="text"
            placeholder="Search locations..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleApplyFilters()}
            className="search-input"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="Planet">Planet</option>
          <option value="Space station">Space Station</option>
          <option value="Microverse">Microverse</option>
          <option value="TV">TV</option>
          <option value="Resort">Resort</option>
          <option value="Fantasy town">Fantasy Town</option>
          <option value="Dream">Dream</option>
          <option value="Dimension">Dimension</option>
          <option value="Menagerie">Menagerie</option>
        </select>

        <select
          value={dimensionFilter}
          onChange={(e) => setDimensionFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Dimensions</option>
          <option value="Dimension C-137">Dimension C-137</option>
          <option value="Replacement Dimension">Replacement Dimension</option>
          <option value="unknown">Unknown</option>
          <option value="Fantasy Dimension">Fantasy Dimension</option>
          <option value="Cronenberg Dimension">Cronenberg Dimension</option>
        </select>

        <button onClick={handleApplyFilters} className="apply-button">
          Apply Filters
        </button>

        {/* <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 size={18} />
            Grid View
          </button>
          <button
            className={viewMode === "grouped" ? "active" : ""}
            onClick={() => setViewMode("grouped")}
          >
            <List size={18} />
            Grouped View
          </button>
        </div> */}
      </div>

      {/* Locations Grid */}
      <div className="locations-content">
        {isLoading && locations.length === 0 ? (
          <div className="locations-grid">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="location-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-text skeleton-title"></div>
                <div className="skeleton-text skeleton-subtitle"></div>
              </div>
            ))}
          </div>
        ) : locations.length === 0 ? (
          <div className="no-results">
            <p>No locations found matching your filters.</p>
          </div>
        ) : (
          <>
            <div className={`locations-grid ${viewMode}`}>
              {locations.map((location: iLocation, index: number) => (
                <Location location={location} key={`${location.id}-${index}`} />
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
                  {isLoading ? "Loading..." : "Load More Locations"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Locations;
