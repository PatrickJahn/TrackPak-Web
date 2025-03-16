import React, { useState } from "react";
import Lottie from "lottie-react";
import MapAnimation from "@/assets/Map.json";
import SubscriptionSelector from "./blocks/SubscriptionSelector";
import CompanyRegistrationForm from "./blocks/CompanyRegistrationForm";
import LoadingView from "../loadiing/LoadingView";
import { useAuth0 } from "@auth0/auth0-react";
import useCompanies from "@/hooks/useCompanies";

const Landing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState("standard");

  const [showRegistration, setShowRegistration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginWithRedirect } = useAuth0();

  const { companyService } = useCompanies();

  async function handleSubmit() {
    setIsSubmitting(true);

    await companyService
      .create({
        brandId: "test",
        cvr: "test",
        name: "Test comp",
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    setTimeout(() => {
      loginWithRedirect({
        authorizationParams: { screen_hint: "signup", company_id: "test123" },
        appState: { company_id: "companyId" },
      });

      setIsSubmitting(false);
    }, 1000);
  }

  if (isSubmitting) return <LoadingView />;

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10  transition object-fill">
        <Lottie
          animationData={MapAnimation}
          loop={true}
          className="w-screen "
          autoplay
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          initialSegment={[0, 330]} // Loop without the last frame to prevent blink
        />
      </div>

      <div className="relative max-w-3xl w-full p-8 backdrop-blur border shadow-lg transition-all duration-100 rounded-2xl z-10 overflow-hidden">
        {!showRegistration ? (
          <SubscriptionSelector
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            onConfirm={() => setShowRegistration(true)}
          />
        ) : (
          <CompanyRegistrationForm
            onSubmit={handleSubmit}
            onBack={() => setShowRegistration(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Landing;
