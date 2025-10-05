import React from "react";
import "./AddButton.css";

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props): React.ReactElement {
  return (
    <button className="fab" aria-label="Add task" onClick={onClick}>
      <span className="plus">+</span>
    </button>
  );
}
