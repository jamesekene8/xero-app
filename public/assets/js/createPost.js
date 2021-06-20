import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const createPost = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/blog",
      data,
    });

    if (res.data.status === "success") {
      showAlert("sucess", `Post created successfully!`);
      window.setTimeout(() => {
        location.assign("/blogs");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
