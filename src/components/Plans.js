import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSubscription,
  selectUser,
  subscribe,
} from "../features/userSlice";
import db from "../firebase";
import "./Plans.css";

function Plans() {
  // 1. Get Plans
  // 2. Render out each plan
  // 3. Handle Subscribes

  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const subscription = useSelector(selectSubscription);
  const dispatch = useDispatch();
  //const [subscription, setSubscription] = useState(null);

  // using local state for subscriptions, moved to app state
  //   useEffect(() => {
  //     db.collection("customers")
  //       .doc(user.uid)
  //       .collection("subscriptions")
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach(async (subscription) => {
  //           setSubscription({
  //             role: subscription.data().role,
  //             current_period_end: subscription.data().current_period_end.seconds,
  //             current_period_start: subscription.data().current_period_start
  //               .seconds,
  //           });
  //         });
  //       });
  //   }, [user.uid]);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          dispatch(
            subscribe({
              role: subscription.data().role,
              current_period_end: subscription.data().current_period_end
                .seconds,
              current_period_start: subscription.data().current_period_start
                .seconds,
            })
          );
        });
      });
  }, [user.uid, dispatch]);

  //don't need real-time because it's not likely the subscription will change
  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref
            .collection("prices")
            .where("active", "==", true)
            .get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProducts(products);
      });
  }, []);

  //console.log("PRODUCTS: ", products);
  //console.log("SUBSCRIPTION: ", subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        //we have a session, redirect to Checkout
        //init stripe
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div>
      {subscription && (
        <p>
          Renewal Date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: add logic if user's subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div className="profileScreen__plan" key={productId}>
            <div>
              <div>{productData.name}</div>
              <div>{productData.description}</div>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
              className={`profileScreen__subscribe ${
                isCurrentPackage && "subscribed"
              }`}
            >
              {!isCurrentPackage ? "Subscribe" : "Unsubscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
