export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "PENDING_APPROVAL";

export type UserRole = "ADMINISTRATOR" | "SUPER_ADMIN" | "CUSTOM";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  profileImagePath: string;
  status: UserStatus;
  createdAt: string;
  roleName: string | null;
  permissionType: UserRole;
  isOwner: boolean;
  loginAttempts: number;
  lastLoginAt: string | null;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface UsersListResponse {
  users: User[];
  pagination: PaginationInfo;
}

export interface GetUsersParams {
  search?: string;
  page?: number;
  limit?: number;
  status?: UserStatus;
}

export interface CreateUserDto {
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  password: string;
  permissionType?: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_APPROVAL";
}

export interface UpdateUserDto {
  fullName?: string;
  phoneNumber?: string;
  countryCode?: string;
  status?: string;
}

export interface DeactivateUserDto {
  reason?: string;
}

export interface UserResponse {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  status: string;
  createdAt: string;
}
