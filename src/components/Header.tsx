import React from "react";
import "./Header.css";

export default function Header(): React.ReactElement {
  return (
    <header className="app-header">
      <div className="header-left">
        <h3>TO-DO APP</h3>
      </div>
      <div className="header-right" />
    </header>
  );
}
