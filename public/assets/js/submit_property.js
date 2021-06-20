import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const submitProperty = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/estate",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Estate Posted successfully");
      window.setTimeout(() => {
        location.assign("/user");
      }, 1500);
    }
  } catch (err) {
    showAlert("warning", err.response.data.message);
  }
};
