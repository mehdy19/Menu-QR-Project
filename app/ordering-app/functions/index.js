const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onOrderCreate = functions.firestore
  .document("orders/{orderId}")
  .onCreate((snap, context) => {
    const orderData = snap.data();
    console.log("New order received:", orderData);
    // Here you could, for example, update an analytics collection
    // with the new order data.
    return null;
  });
