import React,
{ useState }
from "react";

function SearchBox({
  utilities,
  setFilteredUtilities
}) {

  const [searchText,
         setSearchText] =
  useState("");

  const handleSearch =
  (text) => {

    setSearchText(text);

    const lowerText =
      text.toLowerCase();

    const filtered =
      utilities.filter(u =>

        u.type
        .toLowerCase()
        .includes(lowerText)

        ||

        u.risk
        .toLowerCase()
        .includes(lowerText)

        ||

        u.id
        .toLowerCase()
        .includes(lowerText)

    );

    setFilteredUtilities(filtered);

  };

  return (

    <div className="searchBox absolute top-6 left-6 z-10 w-80 max-w-[calc(100vw-4rem)]">
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-zinc-500">search</span>
        <input
          className="w-full bg-[#0F172A]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-full py-2.5 pl-10 pr-4 text-sm font-display text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
          type="text"
          placeholder="Search location, pipeline, area..."
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
    </div>

  );

}

export default SearchBox;