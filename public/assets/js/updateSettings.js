import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const updateSettings = async (data, type) => {
  console.log(axios);
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updatePassword"
        : "/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showAlert("sucess", `${type.toUpperCase()} updated successfully!`);
      window.setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (err) {
    showAlert("danger", err.response.data.message);
  }
};
