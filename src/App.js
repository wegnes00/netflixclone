import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import {
  login,
  logout,
  selectSubscription,
  selectUser,
} from "./features/userSlice";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SplashScreen from "./screens/SplashScreen";

function App() {
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  console.log("USER: ", user);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      console.log("USE EFFECT APP AUTH: ", userAuth);
      if (userAuth) {
        //logged in
        //console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        setLoading(false);
      } else {
        //logged out
        dispatch(logout());
        setLoading(false);
      }
    });
    return unsubscribe; //cleanup
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        {!user && loading ? (
          <SplashScreen />
        ) : !user && !loading ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
            <Route path="/">
              {!subscription ? <ProfileScreen /> : <HomeScreen />}
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
