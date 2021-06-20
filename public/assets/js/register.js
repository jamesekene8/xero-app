import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const register = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Registration Success");
      window.setTimeout(() => {
        location.assign("/user");
      }, 1500);
    }
  } catch (err) {
    showAlert("warning", err.response.data.message);
  }
};
