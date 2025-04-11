import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  DollarSign,
  PieChart,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  initiateSTKPush,
  checkTransactionStatus,
} from "@/services/mpesaService";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DonatePage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("mpesa");
  const [amount, setAmount] = useState<string>("1000");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<
    "pending" | "completed" | "failed" | null
  >(null);
  const [statusCheckInterval, setStatusCheckInterval] = useState<number | null>(
    null,
  );
  const [statusCheckCount, setStatusCheckCount] = useState<number>(0);
  const { toast } = useToast();

  // Function to check transaction status
  const checkStatus = async (checkoutRequestID: string) => {
    console.log("Checking transaction status for ID:", checkoutRequestID);
    try {
      const statusResponse = await checkTransactionStatus(checkoutRequestID);

      // Check if we've reached the maximum number of status checks (5 minutes)
      if (statusCheckCount >= 30) {
        clearInterval(statusCheckInterval as number);
        setStatusCheckInterval(null);
        setTransactionStatus("pending");
        toast({
          title: "Payment status unknown",
          description:
            "We couldn't confirm your payment status. If you completed the payment, please contact support.",
          variant: "destructive",
        });
        return;
      }

      // Increment the status check count
      setStatusCheckCount((prev) => prev + 1);

      // Process the status response
      if (statusResponse.ResultCode === "0") {
        // Payment successful
        clearInterval(statusCheckInterval as number);
        setStatusCheckInterval(null);
        setTransactionStatus("completed");
        toast({
          title: "Payment successful",
          description: "Thank you for your donation to TashaSasha Foundation!",
        });
      } else if (statusResponse.ResultCode === "1032") {
        // Transaction is still being processed, continue checking
        // This is the code for "Request cancelled by user"
        clearInterval(statusCheckInterval as number);
        setStatusCheckInterval(null);
        setTransactionStatus("failed");
        toast({
          variant: "destructive",
          title: "Payment cancelled",
          description: "You cancelled the M-Pesa payment request.",
        });
      } else if (statusResponse.errorCode === "500.001.1001") {
        // This error means the transaction is still being processed
        // Continue checking
      } else {
        // Other error codes indicate failure
        clearInterval(statusCheckInterval as number);
        setStatusCheckInterval(null);
        setTransactionStatus("failed");
        toast({
          variant: "destructive",
          title: "Payment failed",
          description:
            statusResponse.ResultDesc ||
            "There was an error processing your payment.",
        });
      }
    } catch (error) {
      console.error("Error checking transaction status:", error);
      // Don't clear the interval on network errors, keep trying
    }
  };

  // Clear interval when component unmounts
  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    };
  }, [statusCheckInterval]);

  // Reset transaction status when payment method changes
  useEffect(() => {
    setTransactionStatus(null);
    setTransactionId("");
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }
  }, [paymentMethod]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous transaction data
    setTransactionStatus(null);
    setTransactionId("");
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
      setStatusCheckInterval(null);
    }

    if (paymentMethod === "mpesa") {
      // Validate phone number
      if (!phoneNumber) {
        toast({
          variant: "destructive",
          title: "Phone number required",
          description:
            "Please enter your M-Pesa phone number to proceed with the donation.",
        });
        return;
      }

      // Validate amount
      const numAmount = parseInt(amount, 10);
      if (isNaN(numAmount) || numAmount < 10) {
        toast({
          variant: "destructive",
          title: "Invalid amount",
          description: "Please enter a valid amount of at least 10 KES.",
        });
        return;
      }

      try {
        setIsLoading(true);
        setTransactionStatus("pending");

        // Reset status check count
        setStatusCheckCount(0);

        // Show initial toast for payment initiation
        toast({
          title: "Initiating payment",
          description: "Connecting to M-Pesa, please wait...",
        });

        console.log(
          "Initiating M-Pesa payment for phone:",
          phoneNumber,
          "amount:",
          numAmount,
        );

        const response = await initiateSTKPush(
          phoneNumber,
          numAmount,
          "TashaSasha Donation",
        );

        console.log("M-Pesa API response:", response);

        if (response && response.ResponseCode === "0") {
          // Payment initiated successfully
          setTransactionId(response.CheckoutRequestID);
          toast({
            title: "M-Pesa payment initiated",
            description:
              "Please check your phone and enter your M-Pesa PIN to complete the donation.",
          });

          // Start checking transaction status after 10 seconds
          // This gives the user time to enter their PIN
          setTimeout(() => {
            // Check status every 10 seconds
            const interval = window.setInterval(() => {
              checkStatus(response.CheckoutRequestID);
            }, 10000);

            setStatusCheckInterval(interval);
            // Do an immediate check
            checkStatus(response.CheckoutRequestID);
          }, 10000);
        } else {
          // Payment initiation failed
          setTransactionStatus("failed");
          toast({
            variant: "destructive",
            title: "Payment initiation failed",
            description:
              response.ResponseDescription ||
              "There was an error processing your payment. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }
      } catch (error) {
        console.error("Payment error:", error);
        setTransactionStatus("failed");
        toast({
          variant: "destructive",
          title: "Payment failed",
          description:
            "There was an error connecting to M-Pesa. Please check your internet connection and try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // For other payment methods, just show a thank you message
      toast({
        title: "Thank you for your donation",
        description: `Your donation of KES ${amount} via ${paymentMethod} is appreciated.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">
            Support Our Mission
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Your donation helps us provide care, education, and a loving home
            for orphaned children. Every shilling makes a difference in a
            child's life.
          </p>
        </div>

        <div className="mx-auto max-w-md mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                All donations are in Kenya Shillings (KES)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <Label htmlFor="amount">Donation Amount (KES)</Label>
                  <div className="mt-2">
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="100"
                      max="10000"
                      placeholder="Enter amount in KES"
                      required
                      disabled={
                        paymentMethod === "paypal" || paymentMethod === "bank"
                      }
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label>Payment Method</Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="cursor-pointer">
                        M-Pesa
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer">
                        Bank Transfer
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "mpesa" && (
                  <div className="mb-6">
                    <Label htmlFor="phone">M-Pesa Phone Number</Label>
                    <div className="mt-2">
                      <Input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g., 07XXXXXXXX"
                        pattern="^(\+254|0|254)?(7[0-9]{8})$"
                        title="Please enter a valid Kenyan phone number"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-black-500">
                      Enter the phone number registered with M-Pesa. You will
                      receive a prompt on your phone to enter your M-Pesa PIN
                    </p>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="mb-6">
                    <label htmlFor="bank_details">Bank Details</label>
                    <div className="mt-2">
                      {/* show bank details when bank transfer is selected */}
                      <p>
                        Accont Name: TashaSashaFoundation
                        <br />
                        Account Number: 87648769884
                        <br />
                        Bank: Equity Bank
                        <br />
                        Branch: Imara Daima
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mb-6">
                    <label htmlFor="paypal_address">Paypal Address</label>
                    <div className="mt-2">
                      Send your donations to jumamark33@gmail.com
                    </div>
                  </div>
                )}

                {/* Transaction Status Alert */}
                {transactionStatus && (
                  <div className="mb-4">
                    {transactionStatus === "pending" && (
                      <Alert className="bg-yellow-50 border-yellow-200">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <AlertTitle className="text-yellow-800">
                          Payment in progress
                        </AlertTitle>
                        <AlertDescription className="text-yellow-700">
                          Please check your phone and enter your M-Pesa PIN to
                          complete the transaction.
                        </AlertDescription>
                      </Alert>
                    )}
                    {transactionStatus === "completed" && (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">
                          Payment successful
                        </AlertTitle>
                        <AlertDescription className="text-green-700">
                          Thank you for your donation to TashaSasha Foundation!
                        </AlertDescription>
                      </Alert>
                    )}
                    {transactionStatus === "failed" && (
                      <Alert className="bg-red-50 border-red-200">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">
                          Payment failed
                        </AlertTitle>
                        <AlertDescription className="text-red-700">
                          There was an issue with your payment. Please try again
                          or use a different payment method.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    paymentMethod === "paypal" ||
                    paymentMethod === "bank" ||
                    isLoading ||
                    transactionStatus === "pending" ||
                    transactionStatus === "completed"
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : transactionStatus === "completed" ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Donation Complete
                    </>
                  ) : transactionStatus === "pending" ? (
                    <>
                      <Clock className="mr-2 h-4 w-4" />
                      Awaiting Confirmation
                    </>
                  ) : (
                    "Complete Donation"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex-col space-y-2 text-sm text-gray-500">
              <p>
                Your donation will directly support our children's home
                initiative.
              </p>
              <p>
                For assistance, contact us at support@tashasashafoundation.org
              </p>
            </CardFooter>
          </Card>
        </div>

        {/* Financial Transparency Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Financial Transparency
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We believe in complete transparency with our donors. Here's how
              your contributions are making a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">85%</CardTitle>
                <CardDescription>Direct Program Support</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  85% of all donations go directly to supporting our children's
                  home and educational programs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">10%</CardTitle>
                <CardDescription>Administrative Costs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  We keep our administrative costs low at just 10% to maximize
                  the impact of your donations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">5%</CardTitle>
                <CardDescription>Fundraising</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Only 5% is used for fundraising efforts to help us reach more
                  supporters and grow our impact.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">100%</CardTitle>
                <CardDescription>Accountability</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  We provide detailed annual reports and are committed to full
                  financial transparency.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">
              Our Financial Reports
            </h3>
            <p className="text-gray-600 mb-6">
              We publish our financial reports annually to maintain transparency
              with our donors and supporters. These reports provide detailed
              information about how funds are allocated and used to support our
              mission.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <span>Annual Financial Report 2023</span>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <span>Impact Assessment Report 2023</span>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <span>Quarterly Update - Q1 2024</span>
                </div>
                <Button variant="outline" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
