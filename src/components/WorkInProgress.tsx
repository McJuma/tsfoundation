import React from "react";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

const WorkInProgress = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-6">
            <Construction className="h-24 w-24 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-primary">
            Work In Action
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-8">
            We are actively working on various projects to support orphaned
            children in Kenya. This page will soon showcase our ongoing
            initiatives, recent activities, and the impact we're making in the
            community.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-700 mb-6">
              We're currently documenting our recent activities and preparing
              content to share with you. Check back soon to see updates on our
              work in action!
            </p>
            <Button
              onClick={() => (window.location.href = "/contact")}
              variant="default"
              className="mr-4"
            >
              Contact Us
            </Button>
            <Button
              onClick={() => (window.location.href = "/donate")}
              variant="destructive"
            >
              Support Our Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
