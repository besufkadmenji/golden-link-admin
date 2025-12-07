import { useDict } from "@/hooks/useDict";
import { DeactivateModal } from "../shared/DeactivateModal";
import { useManageSubscriber } from "./Detail/useManageSubscriber";

export const DeactivateSubscriber = () => {
  const dict = useDict();
  const { deactivateSubscriber, busy } = useManageSubscriber();

  return (
    <DeactivateModal
      queryParamName="deactivateSubscriber"
      onConfirm={deactivateSubscriber}
      busy={busy}
      title={dict.deactivate_subscriber_reason_form.title}
      description={dict.deactivate_subscriber_reason_form.description}
      showReason={true}
      reasonLabel={
        dict.deactivate_subscriber_reason_form.labels.deactivation_reason
      }
      reasonPlaceholder={
        dict.deactivate_subscriber_reason_form.placeholders.deactivation_reason
      }
    />
  );
};
