import { AutoRedirectSuccessModal } from "@/components/app/shared/AutoRedirectSuccessModal";
import { useDict } from "@/hooks/useDict";

export const SuccessMessage = () => {
  const dict = useDict();

  return (
    <AutoRedirectSuccessModal
      redirectTo="/subscribers"
      message={dict.add_new_subscriber_form.messages.createSuccess}
    />
  );
};
