import { call, put } from "redux-saga/effects";
import endpoint from "../endpoint";

export const sagaFunctions = (action_type, method, api, data, headers) => {
  return function* () {
    let res = null;
    try {
      if (method === "post" || method === "put") {
        res = yield call(endpoint[method], api, data, {
          headers,
        });
      } else {
        res = yield call(endpoint[method], api);
      }
      if (res.status === 200 || res.status === 201) {
        yield put({
          type: action_type.SUCCESS,
          payload: res.data,
        });
      } else {
        yield put({
          type: action_type.FAILED,
          payload: res.data,
        });
      }
    } catch (err) {
      yield put({
        type: action_type.FAILED,
        payload: err,
      });
    }
  };
};
