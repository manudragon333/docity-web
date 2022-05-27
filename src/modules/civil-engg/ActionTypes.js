import { ActionTypesFactory } from "../../utils/redux";

export const AssignCEActionTypes = ActionTypesFactory("CE", "Assign");
export const DecisionActionTypes = ActionTypesFactory("CE", "Decision");
export const AssessmentActionTypes = ActionTypesFactory("CE", "Assessment");
export const SubmitAssessmentActionTypes = ActionTypesFactory(
  "CE",
  "SubmitAssessment"
);
export const FetchCEActionTypes = ActionTypesFactory("CE", "CEs");
export const CEPropertyActionActionTypes = ActionTypesFactory(
  "CE",
  "PropertyAction"
);
export const InviteCEActionTypes = ActionTypesFactory("CE", "Invite");

export const CivilEnggActionTypes = ActionTypesFactory("CE", "CivilEngg");
