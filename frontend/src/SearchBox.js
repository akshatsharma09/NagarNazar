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

    <div className="searchBox absolute top-6 left-6 z-10 w-64 max-w-[calc(100vw-4rem)] pb-4 pr-4">

      <input
        className="w-full bg-white neo-brutalist p-2 px-3 text-base font-display font-bold placeholder-gray-500 focus:outline-none focus:bg-yellow-100 transition-colors"
        type="text"

        placeholder=
        "Search: Water, High..."

        value={searchText}

        onChange={e =>
          handleSearch(e.target.value)
        }

      />

    </div>

  );

}

export default SearchBox;