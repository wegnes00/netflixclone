import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Nav from "../components/Nav";
import Plans from "../components/Plans";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import "./ProfileScreen.css";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const updateProfile = (e) => {
    e.preventDefault();
    //to update email user needs to sign in again
    auth
      .signInWithEmailAndPassword(user.email, passwordRef.current.value)
      .then((userCredential) => {
        userCredential.user.updateEmail(emailRef.current.value);
      })
      .catch((error) => {
        console.log(
          "There was an error updating the current user. ",
          error.message
        );
      });
  };
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img
            src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
            alt=""
          />
          <div className="profileScreen__details">
            <div className="profileSceen__updateEmail">
              <input
                ref={emailRef}
                type="email"
                defaultValue={user?.email}
                required
                placeholder="Email"
              />
              <input
                placeholder="Password"
                ref={passwordRef}
                type="password"
                required
              />
              <button
                className="profileScreen__updateEmail__button"
                onClick={updateProfile}
              >
                Update Email
              </button>
            </div>
            <div>
              To update your email, you need to enter your current password.
            </div>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <Plans />
              <button
                onClick={() => auth.signOut()}
                className="profileScreen__signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ProfileScreen;
