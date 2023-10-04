import { BiSearchAlt } from "react-icons/bi";
import useSearch from "../hooks/useSearch";

const Search = () => {
  const { setSearchValue, isLoading, data, isError, error, searchValue } = useSearch();
  console.log(searchValue, ":", data)
  
  return (
    <form className="flex flex-col items-end my-10 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col gap-4">
        <p className="error-message">{}</p>
        <label htmlFor="character-name">
          Find a character, location or an episode.
        </label>

        <div className="relative">
          <input
            type="text"
            name="character-name"
            id="character-name"
            placeholder="Enter a character name"
            className="w-full bg-black p-2 rounded-lg border border-[#9acd32]"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <BiSearchAlt className="absolute top-3 text-black focus:outline-none right-3" />
        </div>
      </div>
    </form>
  );
};

export default Search;
