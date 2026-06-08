import { AutoRedirectSuccessModal } from "@/components/app/shared/AutoRedirectSuccessModal";
import { useDict } from "@/hooks/useDict";

export const SuccessModal = () => {
  const dict = useDict();

  return (
    <AutoRedirectSuccessModal
      queryParam="showSuccessMessage"
      redirectTo="/subscribers/requests"
      message={dict.messages.success.subscription_approved}
    />
  );
};
