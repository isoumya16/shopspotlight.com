import React from "react";
import "../css/sidebar.css";

const Sidebar = ({ setSelectedComponent }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setSelectedComponent("category")}>Categories</li>
        <li onClick={() => setSelectedComponent("subcategory")}>Subcategories</li>
        <li onClick={() => setSelectedComponent("product")}>Products</li>
      </ul>
    </div>
  );
};

export default Sidebar;
