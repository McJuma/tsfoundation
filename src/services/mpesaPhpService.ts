/**
 * M-Pesa PHP API Service
 * Handles all M-Pesa related API calls to the PHP backend
 */

/**
 * Initiate an STK push request to the customer's phone via PHP backend
 * @param phoneNumber Customer's phone number
 * @param amount Amount to be paid
 * @param reference Reference for the transaction
 * @returns Promise with the transaction response
 */
export async function initiateSTKPush(
  phoneNumber: string,
  amount: number,
  reference: string = "TashaSasha Donation",
) {
  console.log("Starting STK push with params:", {
    phoneNumber,
    amount,
    reference,
  });
  try {
    const response = await fetch("/api/mpesa/stk_push.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        amount,
        reference,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("Error initiating STK push:", error);
    throw new Error("Failed to initiate payment");
  }
}

/**
 * Check the status of an M-Pesa transaction via PHP backend
 * @param checkoutRequestID The checkout request ID from the STK push response
 * @returns Promise with the transaction status
 */
export async function checkTransactionStatus(checkoutRequestID: string) {
  try {
    const response = await fetch("/api/mpesa/check_status.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkoutRequestID,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Transaction status response:", data);
    return data;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    throw new Error("Failed to check payment status");
  }
}
