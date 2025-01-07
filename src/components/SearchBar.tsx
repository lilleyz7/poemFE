import React, { useState } from "react";
import { Input} from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search by title...", onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()){
        alert("Please enter a valid search term")
        return
    }  
    onSearch(query.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleKeyPress}
        className="flex-1"
      />
      <Button onClick={handleSearch} variant="default">
        Search
      </Button>

    </div>
  );
};

export default SearchBar;