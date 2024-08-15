import React, { useContext } from "react";
import classes from "./cart.module.css";
import LayOut from "../../Components/Layout/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Link } from "react-router-dom";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Cart = () => {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your shoping basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>
              Opps! You have no items in your cart. To buy one or more items,
              click "Add to cart" next to the item.
            </p>
          ) : (
            basket?.map((item, index) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={index}
                    product={item}
                    renderDescription={true}
                    flex={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={25} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={25} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length}) items</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift </small>
            </span>
            <Link to="/payments">Continue to check out</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
};

export default Cart;
