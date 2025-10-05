import React from "react";
import "./SearchBar.css";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search To-Do"
        aria-label="Search tasks"
      />
    </div>
  );
};

export default SearchBar;
