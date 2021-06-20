import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const newsletter = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/newsletter/",
      data: { email },
    });
    if (res.status === 200) {
      showAlert("success", "Thanks for subscribing to our newsletter");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
