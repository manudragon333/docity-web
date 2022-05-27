import {
  AlertActionTypes,
  PropertyActionTypes,
  RegionActionTypes,
  CivilEnggActionTypes,
  ContactUsActionTypes,
  QueryTypesActionTypes,
} from "./ActionTypes";

const InitialState = {
  alert: {},
  propertyTypes: {},
  regions: {},
  civilEngg: {},
  postContactUs: {},
  queryTypes: {},
};

export const CommonReducer = (state = InitialState, action) => {
  switch (action.type) {
    case AlertActionTypes.ALERT_OPEN:
      return {
        ...state,
        alert: { open: true, ...action.payload },
      };
    case AlertActionTypes.ALERT_CLOSE:
      return {
        ...state,
        alert: { open: false },
      };
    case PropertyActionTypes.REQUEST:
      return {
        ...state,
        propertyTypes: { loading: true },
      };
    case PropertyActionTypes.SUCCESS:
      return {
        ...state,
        propertyTypes: {
          array: action.payload?.list,
          loading: false,
        },
      };
    case PropertyActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        propertyTypes: {
          ...action.payload,
          errors: { ...payload },
          loading: false,
        },
      };
    }

    case RegionActionTypes.REQUEST:
      return {
        ...state,
        regions: { loading: true },
      };
    case RegionActionTypes.SUCCESS:
      return {
        ...state,
        regions: {
          array: action.payload?.list,
          loading: false,
        },
      };
    case RegionActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        regions: {
          ...action.payload,
          errors: { ...payload },
          loading: false,
        },
      };
    }
    case ContactUsActionTypes.REQUEST:
      return {
        ...state,
        postContactUs: { loading: true },
      };
    case ContactUsActionTypes.SUCCESS:
      return {
        ...state,
        postContactUs: {
          ...action.payload,
          loading: false,
          success: true,
        },
      };
    case ContactUsActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        postContactUs: { errors: { ...payload }, loading: false },
      };
    }
    case ContactUsActionTypes.RESET: {
      return {
        ...state,
        postContactUs: { loading: false },
      };
    }
    case QueryTypesActionTypes.REQUEST:
      return {
        ...state,
        queryTypes: { loading: true },
      };
    case QueryTypesActionTypes.SUCCESS:
      return {
        ...state,
        queryTypes: {
          array: action.payload?.list,
          loading: false,
        },
      };
    case QueryTypesActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        queryTypes: {
          ...action.payload,
          errors: { ...payload },
          loading: false,
        },
      };
    }

    default:
      return state;
  }
};
