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
import { Separator } from "@/components/ui/separator";
import { BarChart, DollarSign, PieChart, FileText } from "lucide-react";

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
