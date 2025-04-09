import React, { useState } from "react";
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

const DonatePage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("mpesa");
  const [amount, setAmount] = useState<string>("1000");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle donation submission logic here
    alert(`Thank you for your donation of KES ${amount} via ${paymentMethod}`);
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

        <div className="mx-auto max-w-md">
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
                      placeholder="Enter amount in KES"
                      required
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
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Enter the phone number registered with M-Pesa
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Complete Donation
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
      </div>
    </div>
  );
};

export default DonatePage;
