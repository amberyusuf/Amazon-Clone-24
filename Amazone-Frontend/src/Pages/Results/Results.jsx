import React, { useEffect, useState } from "react";
import classes from "./results.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import { productUrl } from "../../API/endPoints";
import Loader from "../../Components/Loader/Loader";

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res);
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "10px" }}>Category/{categoryName}</p>
        <hr />

        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDescription={false}
                renderAdd
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Results;
