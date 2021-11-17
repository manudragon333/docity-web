import {
  AuthenticateActionTypes,
  AuthUserActionTypes,
  ChangePasswordActionTypes,
  ForgetPasswordActionTypes,
  GetProfileActionTypes,
  SignUpActionTypes,
  UpdateProfileActionTypes,
  UploadProfilePicActionTypes,
  VerifyTokenActionTypes,
  ResetPasswordActionTypes,
  ValidateEmailActionTypes,
} from "./ActionTypes";

const InitialState = {
  login: {},
  signup: {},
  userDetails: {},
  profile: {},
  profilePic: {},
  forgetPassword: {},
  updateProfile: {},
  verifyToken: {},
  isLoggedIn: { isLoggedIn: false },
  changePassword: {},
  resetPassword: {},
  validateEmail: {},
};

export const AuthReducer = (state = InitialState, action) => {
  switch (action.type) {
    case AuthenticateActionTypes.REQUEST:
      return {
        ...state,
        login: { loading: true },
      };
    case AuthenticateActionTypes.SUCCESS:
      return {
        ...state,
        login: { ...action.payload, loading: false, success: true },
        userDetails: { ...action.payload },
      };
    case AuthenticateActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        login: { errors: { ...payload }, loading: false },
      };
    }

    case AuthenticateActionTypes.RESET: {
      return {
        ...state,
        login: { loading: false },
      };
    }

    case ValidateEmailActionTypes.REQUEST:
      return {
        ...state,
        validateEmail: { loading: true },
      };
    case ValidateEmailActionTypes.SUCCESS:
      return {
        ...state,
        validateEmail: { ...action.payload, loading: false, success: true },
      };
    case ValidateEmailActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        validateEmail: { errors: { ...payload }, loading: false },
      };
    }

    case ValidateEmailActionTypes.RESET: {
      return {
        ...state,
        validateEmail: { loading: false },
      };
    }

    case ResetPasswordActionTypes.REQUEST:
      return {
        ...state,
        resetPassword: { loading: true },
      };
    case ResetPasswordActionTypes.SUCCESS:
      return {
        ...state,
        resetPassword: { ...action.payload, loading: false, success: true },
        userDetails: { ...action.payload },
      };
    case ResetPasswordActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        resetPassword: { errors: { ...payload }, loading: false },
      };
    }

    case ResetPasswordActionTypes.RESET: {
      return {
        ...state,
        resetPassword: { loading: false },
      };
    }

    case VerifyTokenActionTypes.REQUEST:
      return {
        ...state,
        verifyToken: { loading: true },
      };
    case VerifyTokenActionTypes.SUCCESS:
      return {
        ...state,
        verifyToken: { ...action.payload, loading: false },
      };
    case VerifyTokenActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        verifyToken: { errors: { ...payload }, loading: false },
      };
    }

    case VerifyTokenActionTypes.RESET: {
      return {
        ...state,
        verifyToken: { loading: false },
      };
    }
    case AuthenticateActionTypes.custom("IS_LOGGED_IN"): {
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    }
    case SignUpActionTypes.REQUEST:
      return {
        ...state,
        signup: { loading: true },
      };
    case SignUpActionTypes.SUCCESS:
      return {
        ...state,
        signup: { ...action.payload, loading: false, success: true },
      };
    case SignUpActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        signup: { errors: { ...payload }, loading: false },
      };
    }

    case SignUpActionTypes.RESET: {
      return {
        ...state,
        signup: { loading: false },
      };
    }

    case AuthUserActionTypes.REQUEST:
      return {
        ...state,
        signup: { loading: true },
      };
    case AuthUserActionTypes.SUCCESS:
      return {
        ...state,
        signup: { ...action.payload, loading: false, success: true },
      };
    case AuthUserActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        signup: { errors: { ...payload }, loading: false },
      };
    }

    case AuthUserActionTypes.RESET: {
      return {
        ...state,
        signup: { loading: false },
      };
    }

    case ForgetPasswordActionTypes.REQUEST:
      return {
        ...state,
        forgetPassword: { loading: true },
      };

    case ForgetPasswordActionTypes.SUCCESS:
      return {
        ...state,
        forgetPassword: { ...action.payload, loading: false, success: true },
      };

    case ForgetPasswordActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        forgetPassword: { errors: { ...payload }, loading: false },
      };
    }

    case ForgetPasswordActionTypes.RESET: {
      return {
        ...state,
        forgetPassword: { loading: false },
      };
    }

    case ChangePasswordActionTypes.REQUEST:
      return {
        ...state,
        changePassword: { loading: true },
      };

    case ChangePasswordActionTypes.SUCCESS:
      return {
        ...state,
        changePassword: { ...action.payload, loading: false, success: true },
      };

    case ChangePasswordActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        changePassword: { errors: { ...payload }, loading: false },
      };
    }

    case ChangePasswordActionTypes.RESET: {
      return {
        ...state,
        changePassword: { loading: false },
      };
    }

    case GetProfileActionTypes.REQUEST:
      return {
        ...state,
        profile: { ...state.profile, loading: true },
      };

    case GetProfileActionTypes.SUCCESS:
      localStorage.setItem("user", JSON.stringify(action?.payload));
      return {
        ...state,
        profile: { ...action.payload, loading: false },
        userDetails: { ...state.userDetails, user: action.payload },
      };

    case GetProfileActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        profile: { errors: { ...payload }, loading: false },
      };
    }

    case UploadProfilePicActionTypes.REQUEST:
      return {
        ...state,
        profilePic: { loading: true },
      };

    case UploadProfilePicActionTypes.SUCCESS:
      localStorage.setItem("user", JSON.stringify(action?.payload));
      return {
        ...state,
        profilePic: { ...action.payload, loading: false },
        userDetails: { ...state.userDetails, user: action.payload },
        profile: JSON.parse(
          JSON.stringify({
            ...state.profile,
            ...action.payload,
            loading: false,
          })
        ),
      };

    case UploadProfilePicActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        profilePic: { errors: { ...payload }, loading: false },
      };
    }

    case UploadProfilePicActionTypes.RESET: {
      return {
        ...state,
        profilePic: { loading: false },
      };
    }

    case UpdateProfileActionTypes.REQUEST:
      return {
        ...state,
        updateProfile: { loading: true },
      };

    case UpdateProfileActionTypes.SUCCESS:
      localStorage.setItem("user", JSON.stringify(action?.payload));
      return {
        ...state,
        updateProfile: { ...action.payload, loading: false },
        userDetails: { ...state.userDetails, user: action.payload },
      };

    case UpdateProfileActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        updateProfile: { errors: { ...payload }, loading: false },
      };
    }

    case UpdateProfileActionTypes.RESET: {
      return {
        ...state,
        updateProfile: { loading: false },
      };
    }

    default:
      return state;
  }
};
