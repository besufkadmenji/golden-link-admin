export type BusinessIdentity = {
  organizationName?: string | null;
  fullName?: string | null;
};

export const getBusinessDisplayName = ({
  organizationName,
  fullName,
}: BusinessIdentity): string =>
  organizationName?.trim() || fullName?.trim() || "-";
