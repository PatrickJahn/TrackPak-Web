import React from "react";
import { AlertTriangle } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const ServiceUnavailableBlock = () => {
  const { logout } = useAuth0();
  const handleRetry = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin.replace("https://", "http://admin."),
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <AlertTriangle className="text-red-500 w-16 h-16" />
        <h2 className="text-xl font-bold mt-4">Service Unavailable</h2>
        <p className="text-gray-600 mt-2 text-center max-w-sm">
          We are experiencing technical difficulties. Please check back later.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-blue-600 transition"
          onClick={handleRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ServiceUnavailableBlock;
