import React, { useEffect, useState } from "react";
import LayOut from "../../Components/Layout/LayOut";
import { useParams } from "react-router-dom";
import { productUrl } from "../../API/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { productId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDescription
          renderAdd
        />
      )}
    </LayOut>
  );
};

export default ProductDetail;
