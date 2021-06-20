import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const review = async (description, estate) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/reviews",
      data: {
        description,
        estate,
      },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
