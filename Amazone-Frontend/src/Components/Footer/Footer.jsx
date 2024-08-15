import React from "react";
import classes from "./footer.module.css";

function Footer() {
  return (
    <div className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={`${classes.footer__1} ${classes.footer__all}`}>
          <div className={classes.footer__title}>Get To Know Us</div>
          <p>Careers</p>
          <p>Blog</p>
          <p>About Amazon</p>
          <p>Amazon Devices</p>
        </div>

        <div className={`${classes.footer__2} ${classes.footer__all}`}>
          <div className={classes.footer__title}>Make Money with us</div>
          <p>Sell on Amazon</p>
          <p>Sell on Amazon Business</p>
          <p>Sell Your Apps on Amazon</p>
          <p>Become an Affiliate</p>
          <p>Advertise Your Products</p>
          <p>Self-Publish with Us</p>
          <p>Host an Amazon Hub</p>
        </div>

        <div className={`${classes.footer__3} ${classes.footer__all}`}>
          <div className={classes.footer__title}>Amazon Payment Products</div>
          <p>Amazon Business Card</p>
          <p>Shop with Points</p>
          <p>Reload Your Balance</p>
          <p>Amazon Currency Converter</p>
        </div>

        <div className={`${classes.footer__4} ${classes.footer__all}`}>
          <div className={classes.footer__title}>Let Us Help You</div>
          <p>Your Orders</p>
          <p>Shipping Rates & Policies</p>
          <p>Returns & Replacements</p>
          <p>Manage Your Content and Devices</p>
          <p>Amazon Assistant</p>
          <p>Help</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
