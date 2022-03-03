import React from "react";
import Menu from "./Menu";
import "../App.css";

const Base = ({
  children,
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white",
}) => {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-center text-white">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer>
        <div className="container-fluid text-white text-center py-1">
          <h5>
            Made by Mihir Muchhadiya with{" "}
            <i className="fa fa-heart" style={{ color: "pink" }}></i>
          </h5>
        </div>
      </footer>
    </div>
  );
};

export default Base;
