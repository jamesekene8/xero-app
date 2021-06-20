import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/forgetPassword",
      data: {
        email,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Check your email");
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: "POST",
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Password Changed Successfully");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
