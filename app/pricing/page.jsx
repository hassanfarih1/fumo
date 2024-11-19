'use client';
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import NavBar from "../components/NavBar";

export default function Page() {
  const [isYearly, setIsYearly] = useState(false);

  const toggleBillingCycle = () => {
    setIsYearly(!isYearly);
  };

  const plans = [
    {
      title: "Starter",
      description: "Ideal for individuals starting their journey.",
      monthlyPrice: 29,
      yearlyPrice: 20,
      features: [
        "15 images /monthly",
        "Ad free",
        "No watermark",
        "Any aspect ratio",
      ],
    },
    {
      title: "Professional",
      description: "Perfect for professionals needing advanced features.",
      monthlyPrice: 59,
      yearlyPrice: 40,
      features: [
        "40 images /monthly",
        "Ad free",
        "No watermark",
        "Any aspect ratio",
      ],
      mostPopular: true,
    },
    {
      title: "Business",
      description: "Designed for businesses with higher needs.",
      monthlyPrice: 89,
      yearlyPrice: 60,
      features: [
        "80 images /monthly",
        "Ad free",
        "No watermark",
        "Any aspect ratio",
      ],
    },
  ];

  const enterprisePlan = {
    title: "Enterprise",
    description:
      "Have custom requirements? Contact us to give your organization the exact control, and support you need.",
    features: [
      "Enterprise-level support",
      "Payment via invoice",
      "Custom minutes / months",
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center text-center mt-16">
        <h1 className="text-5xl font-extrabold mb-4">
          Start making amazing videos.<span className="underline text-primary text-6xl">Today!</span> 
        </h1>
        <h3 className="text-lg mb-6 text-gray-400">
          Start free for new accounts. No credit card required.
        </h3>
        <div className="flex items-center space-x-4 mb-10">
          <span className={`text-lg ${!isYearly ? "font-bold" : "text-gray-500"}`}>
            Monthly
          </span>
          <div
            onClick={toggleBillingCycle}
            className="relative w-12 h-6 bg-white border border-gray-300 rounded-full cursor-pointer"
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform ${
                isYearly ? "translate-x-6 bg-primary" : "bg-primary"
              }`}
            />
          </div>
          <span className={`text-lg ${isYearly ? "font-bold" : "text-gray-500"}`}>
            Yearly
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const savings =
              plan.monthlyPrice * 12 - plan.yearlyPrice * 12;

            return (
              <div
                key={index}
                className={`relative border-2 border-gray-300 rounded-lg shadow-lg p-6 text-left ${
                  plan.mostPopular ? "border-primary" : ""
                }`}
              >
                {plan.mostPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                {isYearly && (
                  <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ${savings}!
                  </div>
                )}
                <h2 className="text-3xl font-extrabold mb-2">{plan.title}</h2>
                <p className="text-gray-400 opacity-60 mb-4">{plan.description}</p>
                <div
                  className="flex items-center justify-center h-24 mb-4 text-4xl font-extrabold text-primary"
                >
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-opacity-90 mb-4">
                  Start Now
                </button>
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Enterprise Plan */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 p-8 border-4 border-gray-300 rounded-lg shadow-lg">
          <div className="text-center md:text-left md:w-1/2">
            <h2 className="text-3xl font-extrabold mb-4">{enterprisePlan.title}</h2>
            <p className="text-lg text-gray-400 mb-4">{enterprisePlan.description}</p>
            <button className="w-full md:w-auto py-2 px-4 mt-5 bg-primary text-white rounded-md hover:bg-opacity-90">
              Contact Us
            </button>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <ul className="space-y-2">
              {enterprisePlan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-300">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
