import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const ProductCard = ({
  product,
  flex,
  renderDescription,
  renderAdd,
  hideEmptyBasketButton,
}) => {
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  const emptyBasket = () => {
    
    //remove item from basket
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id: id,
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDescription && (
          <div style={{ maxWidth: "750px" }}>{description}</div>
        )}
        <div className={classes.rating}>
          <Rating value={rating ? rating.rate : ""} precision={0.1} />
          <small>{rating ? rating.count : ""} reviews</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to cart
          </button>
        )}

        {!hideEmptyBasketButton && (
          <button className={classes.button} onClick={emptyBasket}>
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
