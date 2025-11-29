import { twMerge } from "tailwind-merge";

export const SimpleTab = ({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <div
      onClick={onPress}
      className={twMerge(
        "grid h-12.5 cursor-pointer items-center rounded-none border-b-4 bg-transparent px-15 text-base text-[#2B2F32] duration-300 ease-in-out",
        active ? "border-b-app-primary" : "border-b-gray-3",
      )}
    >
      {label}
    </div>
  );
};
