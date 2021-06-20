import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const updatePassword = async (
  currentPassword,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/users/updatePassword",
      data: {
        currentPassword,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Password Updated");
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    showAlert("danger", error.response.data.message);
  }
};
