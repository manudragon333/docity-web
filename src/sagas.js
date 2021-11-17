import { all } from "redux-saga/effects";
import { authSaga } from "./modules/auth";
import { commonSaga } from "./modules/common";
import { propertyContactSaga } from "./modules/property-contact";
import { civilEnggSaga } from "./modules/civil-engg";
export function* rootSagas() {
  yield all([authSaga(), commonSaga(), propertyContactSaga(), civilEnggSaga()]);
}
