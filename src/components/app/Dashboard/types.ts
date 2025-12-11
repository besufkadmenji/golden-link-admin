export interface DashboardEntry {
  id: number;
  name: string;
  organizationName: string;
  commercialRegistrationNumber: string;
  email: string;
  phoneNumber: string;
  status: "pending" | "confirmed";
  createdAt: string;
}
