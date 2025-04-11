<?php
/**
 * M-Pesa Transaction Status API Endpoint
 * 
 * This endpoint checks the status of an M-Pesa transaction
 * using the CheckoutRequestID from the STK push response.
 */

// Set headers to allow cross-origin requests and specify JSON content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure this endpoint is only accessible via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get the request body
$requestBody = file_get_contents('php://input');
$requestData = json_decode($requestBody, true);

// Validate request data
if (!isset($requestData['checkoutRequestID'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Missing checkoutRequestID parameter']);
    exit();
}

// Extract request parameters
$checkoutRequestID = $requestData['checkoutRequestID'];

// M-Pesa API credentials
$consumerKey = 'G8TAWATIG5154hOQhNigPbwiUMeGahpWzfFW0auOh4e0krUM';
$consumerSecret = '98HUqbQlEoYffmKPNJn2T3nNDbJco1ASgWGXbq98VfNYKYqV9eZeWMiA7Y162sqC';
$businessShortCode = '174379';
$passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';

// Generate timestamp
$timestamp = date('YmdHis');

// Generate password
$password = base64_encode($businessShortCode . $passkey . $timestamp);

// Get access token
function getAccessToken($consumerKey, $consumerSecret) {
    $url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization: Basic ' . base64_encode($consumerKey . ':' . $consumerSecret)));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    
    if ($httpCode !== 200) {
        error_log('Error getting access token: ' . $response);
        return null;
    }
    
    $result = json_decode($response);
    curl_close($curl);
    
    return $result->access_token ?? null;
}

// Check transaction status
function checkTransactionStatus($token, $businessShortCode, $password, $timestamp, $checkoutRequestID) {
    $url = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
    
    $requestData = array(
        'BusinessShortCode' => $businessShortCode,
        'Password' => $password,
        'Timestamp' => $timestamp,
        'CheckoutRequestID' => $checkoutRequestID
    );
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer ' . $token));
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($requestData));
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    
    if ($httpCode !== 200) {
        error_log('Error checking transaction status: ' . $response);
    }
    
    curl_close($curl);
    
    return $response;
}

// Get access token
$accessToken = getAccessToken($consumerKey, $consumerSecret);

if (!$accessToken) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to authenticate with M-Pesa']);
    exit();
}

// Check transaction status
$statusResponse = checkTransactionStatus(
    $accessToken,
    $businessShortCode,
    $password,
    $timestamp,
    $checkoutRequestID
);

// Log the response for debugging
error_log('Transaction Status Response: ' . $statusResponse);

// Return the response to the client
echo $statusResponse;
