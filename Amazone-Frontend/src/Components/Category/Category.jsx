import React from "react";
import { categoryImage } from "./CategoryInfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";


const Category = () => {
  return (
    <section className={classes.category__container}>
      {categoryImage.map((infos, index) => (
        <CategoryCard data={infos} key={index} />
      ))}
    </section>
  );
};

export default Category;
