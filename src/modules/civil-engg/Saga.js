import { all, takeLatest } from "redux-saga/effects";
import { apis } from "../../utils/apis";
import { sagaFunctions } from "../../utils/sagaActions";
import {
  AssessmentActionTypes,
  AssignCEActionTypes,
  InviteCEActionTypes,
  FetchCEActionTypes,
  CEPropertyActionActionTypes,
  SubmitAssessmentActionTypes,
  CivilEnggActionTypes,
} from "./ActionTypes";

export function assignCEReq(req) {
  let reqId = req.payload.request_id;
  delete req.payload.request_id;
  return sagaFunctions(
    AssignCEActionTypes,
    "post",
    apis.assignCE(reqId),
    req.payload
  )();
}

export function assessmentsReq() {
  return sagaFunctions(AssessmentActionTypes, "get", apis.fetchAssessments)();
}

export function submitAssessmentsReq(req) {
  return sagaFunctions(
    SubmitAssessmentActionTypes,
    "post",
    apis.submitAssessments,
    req.payload
  )();
}

export function inviteCEReq(req) {
  return sagaFunctions(
    InviteCEActionTypes,
    "post",
    apis.inviteCE,
    req.payload
  )();
}

export function fetchCEReq() {
  return sagaFunctions(FetchCEActionTypes, "get", apis.fetchCE)();
}

export function cePropertyActionReq(req) {
  return sagaFunctions(
    CEPropertyActionActionTypes,
    "put",
    apis.cePropertyAction(req.payload.request_id, req.payload.action),
    { estimated_date: req.payload.estimated_date }
  )();
}

export function getCivilEngg({ filters }) {
  let queryStr = "?status=1";
  if (filters?.region) {
    queryStr = queryStr + "&region=" + filters.region;
  }
  return sagaFunctions(
    CivilEnggActionTypes,
    "get",
    apis.civilEnggList + queryStr
  )();
}

export function* assignCEWatcher() {
  yield takeLatest(AssignCEActionTypes.REQUEST, assignCEReq);
}

export function* submitAssessmentWatcher() {
  yield takeLatest(SubmitAssessmentActionTypes.REQUEST, submitAssessmentsReq);
}

export function* inviteCEWatcher() {
  yield takeLatest(InviteCEActionTypes.REQUEST, inviteCEReq);
}

export function* assessmentsWatcher() {
  yield takeLatest(AssessmentActionTypes.REQUEST, assessmentsReq);
}

export function* fetchCEWatcher() {
  yield takeLatest(FetchCEActionTypes.REQUEST, fetchCEReq);
}

export function* cePropertyActionWatcher() {
  yield takeLatest(CEPropertyActionActionTypes.REQUEST, cePropertyActionReq);
}

export function* getCivilEnggWatcher() {
  yield takeLatest(CivilEnggActionTypes.REQUEST, getCivilEngg);
}

export function* civilEnggSaga() {
  yield all([
    assignCEWatcher(),
    assessmentsWatcher(),
    fetchCEWatcher(),
    cePropertyActionWatcher(),
    inviteCEWatcher(),
    submitAssessmentWatcher(),
    getCivilEnggWatcher(),
  ]);
}
