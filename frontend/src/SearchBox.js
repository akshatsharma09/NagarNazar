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

    <div className="searchBox">

      <input

        type="text"

        placeholder=
        "Search: Water, High, Electricity..."

        value={searchText}

        onChange={e =>
          handleSearch(e.target.value)
        }

      />

    </div>

  );

}

export default SearchBox;