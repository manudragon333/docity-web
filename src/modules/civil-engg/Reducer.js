import {
  AssessmentActionTypes,
  AssignCEActionTypes,
  DecisionActionTypes,
  InviteCEActionTypes,
  FetchCEActionTypes,
  CEPropertyActionActionTypes,
  SubmitAssessmentActionTypes,
  CivilEnggActionTypes,
} from "./ActionTypes";

const InitialState = {
  assign: {},
  decision: {},
  assessments: {},
  CEData: {},
  CEPropertyAction: {},
  inviteCE: {},
  submitAssessment: {},
};

export const CivilEngReducer = (state = InitialState, action) => {
  switch (action.type) {
    case AssignCEActionTypes.REQUEST:
      return {
        ...state,
        assign: { loading: true },
      };
    case AssignCEActionTypes.SUCCESS:
      return {
        ...state,
        assign: { ...action.payload, loading: false, success: true },
      };
    case AssignCEActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        assign: { errors: { ...payload }, loading: false },
      };
    }

    case DecisionActionTypes.REQUEST:
      return {
        ...state,
        decision: { loading: true },
      };

    case DecisionActionTypes.SUCCESS:
      return {
        ...state,
        decision: { ...action.payload, loading: false },
      };

    case DecisionActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        decision: { errors: { ...payload }, loading: false },
      };
    }

    case AssessmentActionTypes.REQUEST:
      return {
        ...state,
        assessments: { loading: true },
      };

    case AssessmentActionTypes.SUCCESS:
      return {
        ...state,
        assessments: { ...action.payload, loading: false },
      };

    case AssessmentActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        assessments: { errors: { ...payload }, loading: false },
      };
    }

    case SubmitAssessmentActionTypes.REQUEST:
      return {
        ...state,
        submitAssessment: { loading: true },
      };

    case SubmitAssessmentActionTypes.SUCCESS:
      return {
        ...state,
        submitAssessment: { ...action.payload, loading: false, success: true },
      };

    case SubmitAssessmentActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        submitAssessment: { errors: { ...payload }, loading: false },
      };
    }

    case SubmitAssessmentActionTypes.RESET: {
      return {
        ...state,
        submitAssessment: { loading: false },
      };
    }

    case FetchCEActionTypes.REQUEST:
      return {
        ...state,
        CEData: { loading: true },
      };

    case FetchCEActionTypes.SUCCESS:
      return {
        ...state,
        CEData: { ...action.payload, loading: false },
      };

    case FetchCEActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        CEData: { errors: { ...payload }, loading: false },
      };
    }

    case CEPropertyActionActionTypes.REQUEST:
      return {
        ...state,
        CEPropertyAction: { loading: true },
      };
    case CEPropertyActionActionTypes.SUCCESS:
      return {
        ...state,
        CEPropertyAction: { ...action.payload, loading: false, success: true },
      };
    case CEPropertyActionActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        CEPropertyAction: { errors: { ...payload }, loading: false },
      };
    }

    case InviteCEActionTypes.REQUEST:
      return {
        ...state,
        inviteCE: { loading: true },
      };

    case InviteCEActionTypes.SUCCESS:
      return {
        ...state,
        inviteCE: { ...action.payload, loading: false, success: true },
      };

    case InviteCEActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        inviteCE: { errors: { ...payload }, loading: false },
      };
    }

    case InviteCEActionTypes.RESET: {
      return {
        ...state,
        inviteCE: { loading: false },
      };
    }

    case CivilEnggActionTypes.REQUEST:
      return {
        ...state,
        civilEngg: { loading: true },
      };
    case CivilEnggActionTypes.SUCCESS:
      return {
        ...state,
        civilEngg: {
          array: action.payload,
          loading: false,
        },
      };
    case CivilEnggActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        civilEngg: {
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
