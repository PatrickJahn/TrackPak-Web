import React from "react";

interface SubscriptionSelectorProps {
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  onConfirm: () => void;
}

const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({
  selectedPlan,
  setSelectedPlan,
  onConfirm,
}) => {
  const subscriptionPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9/month",
      description: "Track up to 100 orders per month",
    },
    {
      id: "standard",
      name: "Standard",
      price: "$29/month",
      description: "Track up to 1000 orders per month",
    },
    {
      id: "premium",
      name: "Premium",
      price: "$99/month",
      description: "Unlimited order tracking",
    },
  ];

  return (
    <div className="animate-slide-in">
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome to TrakPak
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Effortless and reliable order tracking for your business
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`p-4 border rounded-xl cursor-pointer hover:border-blue-500 transition duration-200 ${
              selectedPlan === plan.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300"
            }`}
          >
            <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
            <p className="text-lg font-medium text-gray-800">{plan.price}</p>
            <p className="text-sm text-gray-500">{plan.description}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onConfirm}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Confirm Plan
      </button>
    </div>
  );
};

export default SubscriptionSelector;
