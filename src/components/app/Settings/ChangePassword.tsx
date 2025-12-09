import { useDict } from "@/hooks/useDict";
import { Modal, ModalContent } from "@heroui/react";
import { useQueryState } from "nuqs";
import { useChangePasswordForm } from "@/components/app/Settings/useChangePasswordForm";
import { PasswordInput } from "../shared/forms/FormInput";
import { PrimaryButton } from "../shared/button/PrimaryButton";
import { useManageSetting } from "@/components/app/Settings/useManageSetting";

export const ChangePassword = () => {
  const dict = useDict();
  const [changePassword, setChangePassword] = useQueryState("changePassword");
  const { currentPassword, newPassword, confirmPassword, setForm } =
    useChangePasswordForm();
  const { changePassword: handleChangePassword, changingPassword } =
    useManageSetting();
  return (
    <Modal
      isOpen={!!changePassword}
      onClose={() => setChangePassword(null)}
      hideCloseButton
    >
      <ModalContent>
        <div className="grid grid-cols-1 gap-6 px-10 py-8">
          <div className="grid grid-cols-1 justify-items-center gap-4">
            <h2 className="text-xl leading-7 font-bold text-[#1E1E1E]">
              {dict.change_password_form.title}
            </h2>
            <p className="text-base font-medium text-[#A5A7A5]">
              {dict.change_password_form.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <PasswordInput
              label={dict.change_password_form.labels.current_password}
              placeholder={"********"}
              value={currentPassword}
              onChange={(value) => setForm({ currentPassword: value })}
            />
            <PasswordInput
              label={dict.change_password_form.labels.new_password}
              placeholder={"********"}
              value={newPassword}
              onChange={(value) => setForm({ newPassword: value })}
            />
            <PasswordInput
              label={dict.change_password_form.labels.confirm_password}
              placeholder={"********"}
              value={confirmPassword}
              onChange={(value) => setForm({ confirmPassword: value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <PrimaryButton
              className="bg-[#4285F41A] text-[#4285F4]"
              onPress={() => setChangePassword(null)}
              isDisabled={changingPassword}
            >
              {dict.change_password_form.buttons.cancel}
            </PrimaryButton>
            <PrimaryButton
              className="bg-[#E7515A]"
              onPress={() =>
                handleChangePassword({
                  currentPassword,
                  newPassword,
                  confirmPassword,
                })
              }
              isLoading={changingPassword}
              isDisabled={changingPassword}
            >
              {dict.change_password_form.buttons.submit}
            </PrimaryButton>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
