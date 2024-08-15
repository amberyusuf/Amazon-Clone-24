import React from "react";
import classes from "./category.module.css";
import { Link } from "react-router-dom";

const CategoryCard = ({ data }) => {
  const { title, imgLink, categoryName } = data;
  return (
    <div className={classes.category}>
      <Link to={`/category/${categoryName}`}>
        <span>
          <h2>{title}</h2>
        </span>
        <img src={imgLink} alt="" />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
