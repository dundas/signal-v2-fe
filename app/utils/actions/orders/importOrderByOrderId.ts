"use server";
const axios = require("axios");

export async function importOrderByOrderId(data) {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_API_URL}/import/single`,
      data
    );
    console.log("Data posted successfully:", response.data);
    if (response.status == 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.error("Error posting data:", error);
    return { success: false, error: error };
  }
}
