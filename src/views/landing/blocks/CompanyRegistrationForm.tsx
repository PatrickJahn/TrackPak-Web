import AddressAutocompleteInput from "@/components/inputs/AddressAutoCompleteInput";
import { AutoCompleteAddress } from "@/models/geoApify/AutoCompleteAddress";
import { useState } from "react";

interface CompanyRegistrationFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const CompanyRegistrationForm: React.FC<CompanyRegistrationFormProps> = ({
  onBack,
  onSubmit,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    // if (!companyName || !email || !phone) {
    //   alert("Please fill in all fields");
    //   return;
    // }
    onSubmit();
  };

  const handleAddressSelect = (location: AutoCompleteAddress) => {
    console.log("Selected location:", location);
  };

  return (
    <div className="animate-slide-in">
      <h1 className="text-3xl font-bold text-center mb-4">
        Register Your Company
      </h1>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="TrackPak..."
          value={email}
          error=""
          name="companyName"
          onChange={(e) => setEmail(e.target.value)}
          label="Name of Company"
        />
        <Input
          type="text"
          placeholder="2193rhfioq..."
          value={email}
          error=""
          name="cvr"
          onChange={(e) => setEmail(e.target.value)}
          label="CVR"
        />

        <Input
          type="text"
          placeholder="2193rhfioq..."
          value={email}
          error=""
          name="brandid"
          onChange={(e) => setEmail(e.target.value)}
          label="Brand id"
        />

        <AddressAutocompleteInput onSelectAddress={handleAddressSelect} />
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-darker transition mb-2"
        >
          Register
        </button>

        <button
          onClick={onBack}
          className="w-full py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CompanyRegistrationForm;

import React from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const Input: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
}) => {
  return (
    <div className="w-full my-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
