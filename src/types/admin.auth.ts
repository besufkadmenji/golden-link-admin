/**
 * Admin Authentication Types
 */

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  organizationName: string;
  roleName: string;
  permissionType: "ADMINISTRATOR" | "MODERATOR" | "VIEWER";
  userType: "PLATFORM" | "ORGANIZATION";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

export interface AdminAuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
}

export interface AdminAuthData extends AdminAuthTokens {
  user: AdminUser;
}

export interface AdminLoginResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: AdminAuthData;
}

export interface AdminAuthPayload {
  id: string;
  email: string;
  roleName: string;
  permissionType: "ADMINISTRATOR" | "MODERATOR" | "VIEWER";
  userType: "PLATFORM" | "ORGANIZATION";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  fullName: string;
  organizationName: string;
  jti: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}
