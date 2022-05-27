import { all, takeLatest } from "redux-saga/effects";
import { apis } from "../../utils/apis";
import { sagaFunctions } from "../../utils/sagaActions";
import {
  PropertyActionTypes,
  RegionActionTypes,
  CivilEnggActionTypes,
  ContactUsActionTypes,
  QueryTypesActionTypes,
} from "./ActionTypes";

export function getPropertyTypes() {
  return sagaFunctions(PropertyActionTypes, "get", apis.propertyTypes)();
}

export function getRegions() {
  return sagaFunctions(RegionActionTypes, "get", apis.regions)();
}

export function postContactUs(req) {
  return sagaFunctions(
    ContactUsActionTypes,
    "post",
    apis.contactUs,
    req.payload
  )();
}

export function getQueryTypes() {
  return sagaFunctions(QueryTypesActionTypes, "get", apis.queryTypes)();
}

export function* getPropertyTypesWatcher() {
  yield takeLatest(PropertyActionTypes.REQUEST, getPropertyTypes);
}
export function* getRegionsWatcher() {
  yield takeLatest(RegionActionTypes.REQUEST, getRegions);
}

export function* postContactUsWatcher() {
  yield takeLatest(ContactUsActionTypes.REQUEST, postContactUs);
}

export function* getQueryTypesWatcher() {
  yield takeLatest(QueryTypesActionTypes.REQUEST, getQueryTypes);
}

export function* commonSaga() {
  yield all([
    getPropertyTypesWatcher(),
    getRegionsWatcher(),
    postContactUsWatcher,
    getQueryTypesWatcher(),
  ]);
}
