import React, { useState } from "react";
import "../css/admin.css";
import Productlist from '../components/productlist';
import Subcategorylist from "./subcategorylist";
import Categorylist from "./categorylist";

const Admin = () => {

  const [selectedcomponent, setselectedcomponent] = useState(null);

  return (
    <table className="admin-container">
      <tr>
        <td className="sidebar-option" onClick={() => setselectedcomponent("category")}>Categories</td>
        <td rowSpan="3">{selectedcomponent === "category" && <Categorylist />}
          {selectedcomponent === "subcategory" && <Subcategorylist />}
          {selectedcomponent === "product" && <Productlist />}</td>
      </tr>
      <tr>
        <td className="sidebar-option" onClick={() => setselectedcomponent("subcategory")}>Sub categories</td>
      </tr>
      <tr>
        <td className="sidebar-option" onClick={() => setselectedcomponent("product")}>Products</td>
      </tr>
    </table>
  );
};

export default Admin;
