import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import useDebouce from "./useDebounce";

const search = async (searchValue: string, searchType: string) => {
  let endpoint: string;

  if (searchType === "character") {
    endpoint = `https://rickandmortyapi.com/api/character/?name=${searchValue}`;
  } else if (searchType === "location") {
    endpoint = `https://rickandmortyapi.com/api/location/?name=${searchValue}`;
  } else {
    endpoint = `https://rickandmortyapi.com/api/character/?name=${searchValue}`;
  }

  const response = await axios(endpoint);
  return response.data.results;
};

const useSearch = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebouce(searchValue);

  const location = useLocation();
  const { pathname } = location;

  let searchType: string;

  if (pathname === "/characters") {
    searchType = "character";
  } else if (pathname === "/episodes") {
    searchType = "episode";
  } else {
    searchType = "location";
  }

  console.log(searchType)

  const searchQuery = useQuery({
    queryFn: () => search(debouncedValue, searchType),
    queryKey: ["search", debouncedValue],
    staleTime: 30 * 60 * 60,
  });
  useEffect(() => {}, [debouncedValue]);

  return {
    ...searchQuery,
    setSearchValue,
    searchValue,
  };
};

export default useSearch;
