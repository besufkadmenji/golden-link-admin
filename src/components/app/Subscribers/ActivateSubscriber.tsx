import { useDict } from "@/hooks/useDict";
import { ActivateModal } from "../shared/ActivateModal";
import { useManageSubscriber } from "./Detail/useManageSubscriber";

export const ActivateSubscriber = () => {
  const dict = useDict();
  const { activateSubscriber, busy } = useManageSubscriber();

  return (
    <ActivateModal
      queryParamName="activateSubscriber"
      onConfirm={activateSubscriber}
      busy={busy}
      title={dict.activate_subscriber_confirmation.title}
      description={dict.activate_subscriber_confirmation.description}
    />
  );
};
