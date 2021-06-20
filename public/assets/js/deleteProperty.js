import "regenerator-runtime/runtime";
import axios from "axios";
import { showAlert } from "./alerts";

export const deleteProperty = async (id) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/estate/${id}`,
    });
  } catch (error) {}
};
