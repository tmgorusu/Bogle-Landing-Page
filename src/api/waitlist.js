import { API_BASE_URL } from "../config.js";

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function joinWaitlist(payload) {
  console.log("Making API request to:", `${API_BASE_URL}/waitlist`);
  console.log("Payload:", payload);

  try {
    const response = await fetch(`${API_BASE_URL}/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(errorText || "Failed to join waitlist");
    }

    const result = await response.json();
    console.log("API Success Response:", result);
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
