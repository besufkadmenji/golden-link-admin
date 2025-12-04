import { Switch, SwitchProps } from "@heroui/react";
export const AppSwitch = ({ ...rest }: SwitchProps) => {
  return (
    <Switch
      size="sm"
      isSelected={rest.isSelected}
      onValueChange={rest.onValueChange}
      classNames={{
        wrapper: "group-data-[selected=true]:bg-app-primary",
      }}
      {...rest}
    />
  );
};
