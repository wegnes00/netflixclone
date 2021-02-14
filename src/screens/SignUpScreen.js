import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import "./SignUpScreen.css";
import SplashScreen from "./SplashScreen";

function SignUpScreen({ email }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [status, setStatus] = useState("");

  const register = (e) => {
    e.preventDefault();
    setStatus("loading");
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        setStatus("");
      })
      .catch((error) => {
        console.log("There was an error logging in. ", error.message);
        setStatus("Error");
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    setStatus("loading");
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        setStatus("");
      })
      .catch((error) => {
        console.log("Error signing you in. ", error.message);
        setStatus("Error");
      });
  };

  if (status === "loading") {
    return <div className="signUpScreen">Loading...</div>;
  } else {
    return (
      <div className="signUpScreen">
        {status === "Error" && (
          <p>
            There was an error. Please make sure your user name and password are
            correct.
          </p>
        )}
        <form>
          <h1>Sign In</h1>
          <input
            ref={emailRef}
            placeholder="Email"
            type="email"
            defaultValue={email || ""}
            required
          />
          <input
            ref={passwordRef}
            placeholder="Password"
            type="password"
            required
          />
          <button onClick={signIn} type="submit">
            Sign In
          </button>
          <h4>
            <span className="signUpScreen__gray">New to Netflix?</span>{" "}
            <span onClick={register} className="signUpScreen__link">
              Sign Up now
            </span>
            .
          </h4>
        </form>
      </div>
    );
  }
}

export default SignUpScreen;
