/**
 * M-Pesa API Service
 * Handles all M-Pesa related API calls
 */

// M-Pesa API credentials
const CONSUMER_KEY = "G8TAWATIG5154hOQhNigPbwiUMeGahpWzfFW0auOh4e0krUM";
const CONSUMER_SECRET =
  "98HUqbQlEoYffmKPNJn2T3nNDbJco1ASgWGXbq98VfNYKYqV9eZeWMiA7Y162sqC";
const BUSINESS_SHORT_CODE = "174379";
const PASSKEY =
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
const PHONE_NUMBER = "254758109581";

// M-Pesa API endpoints
const BASE_URL = "https://sandbox.safaricom.co.ke";
const TOKEN_URL = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
const STK_PUSH_URL = `${BASE_URL}/mpesa/stkpush/v1/processrequest`;

// Add CORS proxy to handle cross-origin requests
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

/**
 * Generate the authentication token for M-Pesa API
 * @returns Promise with the auth token
 */
async function getAuthToken(): Promise<string> {
  try {
    const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    const response = await fetch(CORS_PROXY + TOKEN_URL, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
        Origin: "https://tashasashafoundation.org",
      },
    });

    const data = await response.json();
    console.log("Auth token response:", data);
    return data.access_token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    throw new Error("Failed to authenticate with M-Pesa");
  }
}

/**
 * Generate the timestamp in the format required by M-Pesa
 * @returns Formatted timestamp string
 */
function getTimestamp(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hour}${minute}${second}`;
}

/**
 * Generate the password for the STK push request
 * @param timestamp Current timestamp
 * @returns Encoded password string
 */
function generatePassword(timestamp: string): string {
  const password = `${BUSINESS_SHORT_CODE}${PASSKEY}${timestamp}`;
  return btoa(password);
}

/**
 * Initiate an STK push request to the customer's phone
 * @param phoneNumber Customer's phone number (format: 254XXXXXXXXX)
 * @param amount Amount to be paid
 * @param callbackUrl Callback URL for the transaction result
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
    // Format phone number (remove leading 0 if present and ensure it starts with 254)
    let formattedPhone = phoneNumber.trim().replace(/[\s-]/g, "");
    if (formattedPhone.startsWith("+")) {
      formattedPhone = formattedPhone.substring(1);
    }
    if (formattedPhone.startsWith("0")) {
      formattedPhone = `254${formattedPhone.substring(1)}`;
    }
    if (!formattedPhone.startsWith("254")) {
      formattedPhone = `254${formattedPhone}`;
    }

    console.log("Formatted phone number:", formattedPhone);

    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);
    const token = await getAuthToken();

    const response = await fetch(CORS_PROXY + STK_PUSH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Origin: "https://tashasashafoundation.org",
      },
      body: JSON.stringify({
        BusinessShortCode: 174379,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: "254758109581",
        PhoneNumber: formattedPhone,
        CallBackURL: "https://tashasashafoundation.org/api/mpesa/callback", // This would be replaced with your actual callback URL in production
        AccountReference: reference,
        TransactionDesc: "Donation to TashaSasha Foundation",
      }),
    });

    const data = await response.json();
    console.log("API response data:", data);
    return data;
  } catch (error) {
    console.error("Error initiating STK push:", error);
    throw new Error("Failed to initiate payment");
  }
}

/**
 * Check the status of an M-Pesa transaction
 * @param checkoutRequestID The checkout request ID from the STK push response
 * @returns Promise with the transaction status
 */
export async function checkTransactionStatus(checkoutRequestID: string) {
  try {
    const token = await getAuthToken();
    const timestamp = getTimestamp();
    const password = generatePassword(timestamp);

    const response = await fetch(
      CORS_PROXY + `${BASE_URL}/mpesa/stkpushquery/v1/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Origin: "https://tashasashafoundation.org",
        },
        body: JSON.stringify({
          BusinessShortCode: BUSINESS_SHORT_CODE,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestID,
        }),
      },
    );

    const data = await response.json();
    console.log("Transaction status response:", data);
    return data;
  } catch (error) {
    console.error("Error checking transaction status:", error);
    throw new Error("Failed to check payment status");
  }
}
