import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (event) => {
    console.log(event);
    event?.error?.message
      ? setCardError(event?.error?.message)
      : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // contact backend || functions --->step 1
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      //Client side (react side confirmation) ---> step 2

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);

      // after confirmation ---> save order in firestore database, and clear basket

      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          payment: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setProcessing(false);

       dispatch({
         type: Type.EMPTY_BASKET,
       });

      navigate("/orders", {
        state: { msg: "You have placed a new order. Please see the details below" }
      });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* payment */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Fake Address</div>
            <div>Fake City, MD</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery info</h3>
          <div>
            {basket?.map((item, index) => {
              return <ProductCard product={item} flex={true} key={index} />;
            })}
          </div>
        </div>
        <hr />
        {/* card form*/}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price  */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total order</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loader}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;




