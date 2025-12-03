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

export interface ForgotPasswordDto {
  email: string;
}

export interface ForgotPasswordData {
  sessionId: string;
}

export interface ForgotPasswordResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: ForgotPasswordData;
}

export interface VerifyResetCodeDto {
  email: string;
  verificationCode: string;
  sessionId: string;
}

export interface VerifyResetCodeData {
  verifiedSessionId: string;
}

export interface VerifyResetCodeResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: VerifyResetCodeData;
}

export interface ResetPasswordDto {
  email: string;
  newPassword: string;
  confirmPassword: string;
  sessionId: string;
}

export interface ResetPasswordResponse {
  status: "success" | "error";
  statusCode: number;
  message: string;
  data: null;
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
