import { all, put, takeLatest } from "redux-saga/effects";
import { apis } from "../../utils/apis";
import { sagaFunctions } from "../../utils/sagaActions";
import {
  AuthenticateActionTypes,
  ForgetPasswordActionTypes,
  SignUpActionTypes,
  GetProfileActionTypes,
  UpdateProfileActionTypes,
  UploadProfilePicActionTypes,
  VerifyTokenActionTypes,
  AuthUserActionTypes,
  ChangePasswordActionTypes,
  ResetPasswordActionTypes,
  ValidateEmailActionTypes,
} from "./ActionTypes";

export function login(req) {
  return sagaFunctions(
    AuthenticateActionTypes,
    "post",
    apis.login,
    req.payload
  )();
}

export function isLoggedIn(payload) {
  return function* () {
    yield put({
      type: AuthenticateActionTypes.custom("IS_LOGGED_IN"),
      payload,
    });
  };
}

export function signup(req) {
  return sagaFunctions(SignUpActionTypes, "post", apis.register, req.payload)();
}

export function authuser(req) {
  return sagaFunctions(
    AuthUserActionTypes,
    "post",
    apis.authUser,
    req.payload
  )();
}

export function uploadProfilePic(req) {
  return sagaFunctions(
    UploadProfilePicActionTypes,
    "put",
    apis.uploadProfilePic,
    req.payload,
    {
      "Content-Type": "multipart/form-data",
    }
  )();
}

export function getProfile() {
  return sagaFunctions(GetProfileActionTypes, "get", apis.profile)();
}

export function updateProfile(req) {
  console.log(req)
  return sagaFunctions(
    UpdateProfileActionTypes,
    "put",
    apis.profile,
    req.payload
  )();
}

export function forgetPassword(req) {
  return sagaFunctions(
    ForgetPasswordActionTypes,
    "post",
    apis.forgotPassword,
    req.payload
  )();
}

export function changePassword(req) {
  return sagaFunctions(
    ChangePasswordActionTypes,
    "put",
    apis.changePassword,
    req.payload
  )();
}

export function validateEmailReq(req) {
  return sagaFunctions(ValidateEmailActionTypes, "post", apis.validateEmail, {
    emailId: req.email,
  })();
}

export function resetPassword(req) {
  return sagaFunctions(
    ResetPasswordActionTypes,
    "put",
    apis.resetPassword,
    req.payload
  )();
}

export function verifyToken(req) {
  return sagaFunctions(
    VerifyTokenActionTypes,
    "get",
    apis.verifyToken(encodeURIComponent(req.token))
  )();
}

export function* loginWatcher() {
  yield takeLatest(AuthenticateActionTypes.REQUEST, login);
}

export function* resetPasswordWatcher() {
  yield takeLatest(ResetPasswordActionTypes.REQUEST, resetPassword);
}

export function* isLoggedInWatcher() {
  yield takeLatest(AuthenticateActionTypes.custom("IS_LOGGED_IN"), isLoggedIn);
}

export function* signupWatcher() {
  yield takeLatest(SignUpActionTypes.REQUEST, signup);
}

export function* forgetPasswordWatcher() {
  yield takeLatest(ForgetPasswordActionTypes.REQUEST, forgetPassword);
}

export function* changePasswordWatcher() {
  yield takeLatest(ChangePasswordActionTypes.REQUEST, changePassword);
}

export function* validateEmailWatcher() {
  yield takeLatest(ValidateEmailActionTypes.REQUEST, validateEmailReq);
}

export function* getProfileWatcher() {
  yield takeLatest(GetProfileActionTypes.REQUEST, getProfile);
}
export function* updateProfileWatcher() {
  yield takeLatest(UpdateProfileActionTypes.REQUEST, updateProfile);
}
export function* profilePicWatcher() {
  yield takeLatest(UploadProfilePicActionTypes.REQUEST, uploadProfilePic);
}

export function* verifyTokenWatcher() {
  yield takeLatest(VerifyTokenActionTypes.REQUEST, verifyToken);
}

export function* authUserWatcher() {
  yield takeLatest(AuthUserActionTypes.REQUEST, authuser);
}

export function* authSaga() {
  yield all([
    loginWatcher(),
    signupWatcher(),
    forgetPasswordWatcher(),
    updateProfileWatcher(),
    profilePicWatcher(),
    getProfileWatcher(),
    isLoggedInWatcher(),
    verifyTokenWatcher(),
    authUserWatcher(),
    changePasswordWatcher(),
    resetPasswordWatcher(),
    validateEmailWatcher(),
  ]);
}
