import useCompanies from "@/hooks/useCompanies";

export const useEmployeeHandlers = () => {
  const { useQueryMyCompany, create } = useCompanies();
  const { data: company } = useQueryMyCompany();

  const onSubmit = async (data: FormData) => {
    console.log("Form Submission Data:", data);

    const req = {
      ...data,
      companyId: company?.id,
      role: 2,
      phoneNumber: "",
    };
  };

  return { onSubmit };
};
