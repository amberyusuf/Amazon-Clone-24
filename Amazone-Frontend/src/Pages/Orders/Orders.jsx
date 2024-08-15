import React, { useContext, useEffect, useState } from "react";
import classes from "./orders.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useLocation } from "react-router-dom";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const navStateData = useLocation();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          {navStateData?.state?.msg && (
            <small
              style={{
                padding: "5px",
                textAlign: "center",
                color: "green",
                fontWeight: "bold",
              }}
            >
              {navStateData?.state?.msg}
            </small>
          )}

          <h2>Your Orders</h2>
          {/* ordered items */}
          {orders?.length == 0 && (
            <div
              style={{
                padding: "20px",
              }}
            >
              You have no items in your cart. To buy one or more items, click
              "Add to cart" next to the item.
            </div>
          )}

          <div>
            {orders?.map((singleOrder, index) => {
              return (
                <div key={index}>
                  <hr />
                  <p>Order ID: {singleOrder?.id}</p>
                  {singleOrder?.data?.basket.map((order, index) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={order}
                        key={order.id}
                        hideEmptyBasketButton={true}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
