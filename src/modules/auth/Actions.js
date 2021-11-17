import { FetchPropertyActionTypes } from "../property-contact";
import {
  AuthenticateActionTypes,
  SignUpActionTypes,
  ForgetPasswordActionTypes,
  UpdateProfileActionTypes,
  UploadProfilePicActionTypes,
  GetProfileActionTypes,
  VerifyTokenActionTypes,
  AuthUserActionTypes,
  ChangePasswordActionTypes,
  ResetPasswordActionTypes,
  ValidateEmailActionTypes,
} from "./ActionTypes";

export const authenticateRequest = (payload) => ({
  type: AuthenticateActionTypes.REQUEST,
  payload,
});

export const resetPasswordRequest = (payload) => ({
  type: ResetPasswordActionTypes.REQUEST,
  payload,
});

export const loginReset = () => ({
  type: AuthenticateActionTypes.RESET,
});

export const resetPasswordReset = () => ({
  type: ResetPasswordActionTypes.RESET,
});

export const isLoggedInAction = (payload) => ({
  type: AuthenticateActionTypes.custom("IS_LOGGED_IN"),
  payload,
});

export const reqVerificationFormValues = (payload) => ({
  type: FetchPropertyActionTypes.custom("REQ_VERIFY_FORM_VALUES"),
  payload,
});

export const resetReqVerificationFormValues = () => ({
  type: FetchPropertyActionTypes.custom("RESET_REQ_VERIFY_FORM_VALUES"),
});

export const signUpRequest = (payload) => ({
  type: SignUpActionTypes.REQUEST,
  payload,
});

export const signupReset = () => ({
  type: SignUpActionTypes.RESET,
});

export const forgetPasswordRequest = (payload) => ({
  type: ForgetPasswordActionTypes.REQUEST,
  payload,
});

export const forgetPasswordReset = () => ({
  type: ForgetPasswordActionTypes.RESET,
});

export const changePasswordReset = () => ({
  type: ChangePasswordActionTypes.RESET,
});

export const updateProfileRequest = (payload) => ({
  type: UpdateProfileActionTypes.REQUEST,
  payload,
});

export const updateProfileReset = () => ({
  type: UpdateProfileActionTypes.RESET,
});

export const validateEmail = (email) => ({
  type: ValidateEmailActionTypes.REQUEST,
  email,
});

export const resetValidateEmail = () => ({
  type: ValidateEmailActionTypes.RESET,
});

export const uploadProfilePicRequest = (payload) => ({
  type: UploadProfilePicActionTypes.REQUEST,
  payload,
});

export const uploadProfilePicReset = () => ({
  type: UploadProfilePicActionTypes.RESET,
});

export const getProfile = () => ({
  type: GetProfileActionTypes.REQUEST,
});

export const verifyToken = (token) => ({
  type: VerifyTokenActionTypes.REQUEST,
  token,
});

export const authUser = (payload) => ({
  type: AuthUserActionTypes.REQUEST,
  payload,
});

export const changePassword = (payload) => ({
  type: ChangePasswordActionTypes.REQUEST,
  payload,
});
