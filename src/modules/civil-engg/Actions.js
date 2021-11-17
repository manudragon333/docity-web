import {
  AssessmentActionTypes,
  AssignCEActionTypes,
  DecisionActionTypes,
  InviteCEActionTypes,
  FetchCEActionTypes,
  CEPropertyActionActionTypes,
  SubmitAssessmentActionTypes,
} from "./ActionTypes";

export const assignCERequest = (payload) => ({
  type: AssignCEActionTypes.REQUEST,
  payload,
});

export const inviteCERequest = (payload) => ({
  type: InviteCEActionTypes.REQUEST,
  payload,
});

export const inviteCEReset = () => ({
  type: InviteCEActionTypes.RESET,
});

export const decision = () => ({
  type: DecisionActionTypes.REQUEST,
});

export const fetchAssessments = () => ({
  type: AssessmentActionTypes.REQUEST,
});

export const submitAssessmentsRequest = (payload) => ({
  type: SubmitAssessmentActionTypes.REQUEST,
  payload,
});

export const submitAssessmentsReset = () => ({
  type: SubmitAssessmentActionTypes.RESET,
});

export const fetchCE = () => ({
  type: FetchCEActionTypes.REQUEST,
});

export const CEPropertyAction = (payload) => ({
  type: CEPropertyActionActionTypes.REQUEST,
  payload,
});
