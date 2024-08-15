import React, { useState, useContext } from "react";
import classes from "./signUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { PulseLoader } from "react-spinners";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const authHandler = (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      setLoading((loading) => {
        return { ...loading, signIn: true };
      });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading((loading) => {
            return { ...loading, signIn: false };
          });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((loading) => {
            return { ...loading, signIn: false };
          });
        });
    } else {
      setLoading((loading) => {
        return { ...loading, signUp: true };
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

          setLoading((loading) => {
            return { ...loading, signUp: false };
          });
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading((loading) => {
            return { ...loading, signUp: false };
          });
        });
    }
  };

  return (
    <section className={classes.login}>

      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            className={classes.login__signinbtn}
            type="submit"
            onClick={authHandler}
            name="signin"
          >
            {loading.signIn ? (
              <PulseLoader color="#fff" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in, you agree to the Amazone fake clone Conditions of Use
          and Sale. Please see our Privacy Notice, our Cookie Notice and our
          Interest-Based Ads Notice.
        </p>
        
        {/* sign up */}
        <button
          className={classes.login__registerbtn}
          type="submit"
          onClick={authHandler}
          name="signup"
        >
          {loading.signUp ? (
            <PulseLoader color="#fff" size={15} />
          ) : (
            "Create your Amazone fake Clone Account"
          )}
        </button>

        {error && <small>{error}</small>}
      </div>
    </section>
  );
};

export default Auth;
