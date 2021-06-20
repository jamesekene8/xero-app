import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const bookEstate = async (estateId) => {
  const stripe = Stripe(
    "pk_test_51IziLWJQxirzeJ4njqRQyiyixlbzvkUzujdyIaNLGW1r47XY3nSmWmCxtiOpZL3d7qpzQKOmv12vpW9YBkXJS40B00EArffH8G"
  );
  try {
    const session = await axios(
      `/api/v1/bookings/checkout-session/${estateId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert("error", err);
  }
};
