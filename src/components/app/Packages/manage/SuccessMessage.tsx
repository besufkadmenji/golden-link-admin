import { AutoRedirectSuccessModal } from "@/components/app/shared/AutoRedirectSuccessModal";
import { useDict } from "@/hooks/useDict";

export const SuccessMessage = () => {
  const dict = useDict();

  return (
    <AutoRedirectSuccessModal
      redirectTo="/packages"
      message={dict.packages.messages.createSuccess}
    />
  );
};
