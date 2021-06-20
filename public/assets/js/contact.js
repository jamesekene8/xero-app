import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const contact = async (name, email, phone, subject, message) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/contact/",
      data: { name, email, phone, subject, message },
    });
    if (res.status === 200) {
      showAlert("success", "Your message has been sent successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("warning", err.response.data.message);
  }
};
