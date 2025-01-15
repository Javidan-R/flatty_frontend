import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShowMap, SearchIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";

export const SearchbarMobile = () => {
  const [dropdownStates, setDropdownStates] = useState({
    category: null,
    roomNumber: null,
    priceRange: { min: "", max: "" },
    location: null,
  });
  const navigate = useNavigate();
  const handleSearch = () => {
    const { min, max } = dropdownStates.priceRange;
    console.log(`Searching with price range: $${min} - $${max}`);
    // You can implement the logic to filter/search based on the price range here
    navigate("/search");
  };

  const handleShowOnMap = () => {
    console.log("Showing location on map...");
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    console.log(`Search input changed to: ${value}`);
    // You can implement the logic to filter/search based on the search input here
  };
  return (
    <motion.div
      className="max-w-full w-full h-[54px] mx-auto bg-white rounded-l-sm rounded-r-sm  shadow-lg  flex  sm:flex-grow sm:flex-row"
      style={{
        boxShadow: "0px 1px 1px 0px #703ACA14",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid items-center w-full h-full grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        <div className="relative">
          <input
            type="text"
            // value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="w-[95%] px-4 py-2 ml-1 text-left bg-white border border-gray-200 rounded-md"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <a href="/map">
          <button
            onClick={handleShowOnMap}
            className="flex items-center justify-center px-4 py-4 text-xl w-[auto] text-[#8247E5] bg-white border-2 border-[#8247E5] h-[54px] font-semibold"
          >
            <ShowMap />
          </button>
        </a>
        <motion.button
          onClick={handleSearch}
          className="bg-[#8247E5] hover:bg-[#A673EF] text-xl w-[auto] text-white col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 transition-colors duration-300 h-full rounded-r-md font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <SearchIcon />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchbarMobile;
