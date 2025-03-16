import useAddress from "@/hooks/useAddress";
import { AutoCompleteAddress } from "@/models/geoApify/AutoCompleteAddress";
import React, { useState, useEffect, useRef } from "react";

type AddressAutocompleteProps = {
  onSelectAddress: (location: AutoCompleteAddress) => void;
  placeholder?: string;
  label?: string;
};

const AddressAutocompleteInput: React.FC<AddressAutocompleteProps> = ({
  onSelectAddress,
  placeholder = "Search address...",
  label = "Address",
}) => {
  const { useQueryAddress } = useAddress();
  const [query, setQuery] = useState("");
  const [addressSelected, setAddressSelected] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounceTimeout = useRef<number>(null);

  useEffect(() => {
    if (query == addressSelected) return;
    else setAddressSelected("");
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, setAddressSelected]);

  const {
    data: results = [],
    isLoading,
    isFetching,
  } = useQueryAddress(debouncedQuery);

  const showDropdown =
    debouncedQuery.length >= 3 &&
    !addressSelected &&
    (results.length > 0 || isLoading || isFetching);

  return (
    <div className="relative w-full my-1">
      <label
        htmlFor={"search-address"}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        name="search-address"
        className="w-full border rounded-lg px-4 py-2 border-gray-300  shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown && (
        <div className="absolute z-10 bg-white border rounded-lg shadow-md mt-1 w-full">
          {isLoading || isFetching ? (
            <div className="p-3 text-gray-500">Loading...</div>
          ) : results.length > 0 ? (
            results.map((location, idx) => (
              <div
                key={idx}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelectAddress(location);
                  setQuery(location.formatted);
                  setAddressSelected(location.formatted);
                }}
              >
                {location.formatted}
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
};
export default AddressAutocompleteInput;
