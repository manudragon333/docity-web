import { ActionTypesFactory } from "../../utils/redux";

export const AuthenticateActionTypes = ActionTypesFactory(
  "Auth",
  "Authenticate"
);
export const SignUpActionTypes = ActionTypesFactory("Auth", "Signup");
export const ForgetPasswordActionTypes = ActionTypesFactory(
  "Auth",
  "ForgetPassword"
);
export const ResetPasswordActionTypes = ActionTypesFactory(
  "Auth",
  "ResetPassword"
);

export const ValidateEmailActionTypes = ActionTypesFactory(
  "Auth",
  "ValidateEmail"
);

export const UploadProfilePicActionTypes = ActionTypesFactory(
  "Profile",
  "UploadProfilePic"
);

export const GetProfileActionTypes = ActionTypesFactory(
  "Profile",
  "GetProfile"
);

export const ChangePasswordActionTypes = ActionTypesFactory(
  "Profile",
  "ChangePassword"
);

export const UpdateProfileActionTypes = ActionTypesFactory(
  "Profile",
  "UpdateProfile"
);

export const VerifyTokenActionTypes = ActionTypesFactory(
  "Profile",
  "VerifyProfile"
);

export const AuthUserActionTypes = ActionTypesFactory("Profile", "AuthUser");
