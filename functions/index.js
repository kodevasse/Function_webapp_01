const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");
admin.initializeApp();

// Replace with your Stripe secret key
const stripe = new Stripe(
  "sk_test_51K2ZqAJ0sZs1crdee99X9duec8bTIcAxeqZHBgx3cuNE2DUPjSNWMNzZkSo765DiENM3y4z9UJ5yh5BeX9wvaxpW00vjo5cYxH"
);

exports.createStripeCheckoutSession = functions.https.onCall(
  async (data, context) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: data.lineItems, // array of products
      mode: "payment",
      success_url: data.successUrl, // client-side URL for successful purchase
      cancel_url: data.cancelUrl, // client-side URL for cancelled purchase
    });

    return { sessionId: session.id };
  }
);
