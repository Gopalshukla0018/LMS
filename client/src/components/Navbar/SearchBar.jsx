import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();

    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }

    setSearchQuery("");
  };

  return (
    <div>
      <form onSubmit={searchHandler} className=" w-100">
        <div className="relative flex items-center w-full">
          <Input
            type="text"
            placeholder="Search for courses, skills and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-5 text-base border-2 border-gray-200 rounded-full shadow-inner pr-14 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />

          <Button
            type="submit"
            className="absolute right-1.5 flex items-center justify-center w-9 h-9 p-0 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none"
          >
            <Search size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
