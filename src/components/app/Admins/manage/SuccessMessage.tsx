import { AutoRedirectSuccessModal } from "@/components/app/shared/AutoRedirectSuccessModal";
import { useDict } from "@/hooks/useDict";

export const SuccessMessage = () => {
  const dict = useDict();

  return (
    <AutoRedirectSuccessModal
      redirectTo="/admins"
      getMessage={(value) =>
        value === "edit"
          ? dict.system_managers_page.messages.updateSuccess
          : dict.system_managers_page.messages.createSuccess
      }
    />
  );
};
