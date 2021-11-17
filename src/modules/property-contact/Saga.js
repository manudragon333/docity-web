import { all, call, put, takeLatest } from "redux-saga/effects";
import endpoint from "../../endpoint";
import { apis } from "../../utils/apis";
import { sagaFunctions } from "../../utils/sagaActions";
import {
  VerifyPropertyActionTypes,
  ContactMeActionTypes,
  UploadTypesActionTypes,
  FetchPropertiesActionTypes,
  FetchPropertyActionTypes,
  UploadDocActionTypes,
  DeleteDocActionTypes,
  DocWriterActionTypes,
  AddNoteToDocActionTypes,
  AddAnnotationActionTypes,
  UpdateAnnotationActionTypes,
  FinalReportActionTypes,
  ShareReportActionTypes,
} from "./ActionTypes";

export function verifyProperty(req) {
  return sagaFunctions(
    VerifyPropertyActionTypes,
    "post",
    apis.verifyProperty,
    req.payload
  )();
}

export function updateVerifyProperty(req) {
  return sagaFunctions(
    VerifyPropertyActionTypes,
    "put",
    apis.verifyProperty,
    req.payload
  )();
}

export function fetchProperties({ filters }) {
  let str = "?";

  if (filters.page) {
    str = str + "offset=" + filters.page;
  }

  if (filters.limit) {
    str = str + "&limit=" + filters.limit;
  }

  if (filters.searchText) {
    str = str + "&searchText=" + filters.searchText;
  }

  if (filters.sortBy) {
    str = str + "&sortBy=" + filters.sortBy;
  }

  return sagaFunctions(
    FetchPropertiesActionTypes,
    "get",
    apis.verifyProperty + str
  )();
}

export function fetchProperty(req) {
  return sagaFunctions(
    FetchPropertyActionTypes,
    "get",
    apis.fetchProperty(req.payload)
  )();
}

export function uploadDoc(req) {
  return sagaFunctions(
    UploadDocActionTypes,
    "post",
    apis.uploadDoc(req.payload.request_id),
    req.payload.formData,
    {
      "Content-Type": "multipart/form-data",
    }
  )();
}

export function documentWriter(req) {
  return sagaFunctions(
    DocWriterActionTypes,
    "put",
    apis.documentWriter(req.payload.request_id),
    {
      name: req.payload.name,
      contactNumber: req.payload.contactNumber,
    }
  )();
}

export function* deleteUploadDocument(req) {
  let res = null;
  try {
    res = yield call(
      endpoint.delete,
      apis.deleteDoc(req.payload.request_id, req.payload.doc_id)
    );
    console.log("res", res);

    if (res.status === 200 || res.status === 201) {
      yield put({
        type: DeleteDocActionTypes.SUCCESS,
        payload: req.payload,
      });
    } else {
      console.log("in else");
      yield put({
        type: DeleteDocActionTypes.FAILED,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log("in catch");
    yield put({
      type: DeleteDocActionTypes.FAILED,
      payload: err,
    });
  }
}

export function addNoteToDocument(req) {
  return sagaFunctions(
    AddNoteToDocActionTypes,
    "put",
    apis.deleteDoc(req.payload.request_id, req.payload.doc_id),
    {
      notes: req.payload.notes,
    }
  )();
}

export function contactMe(req) {
  return sagaFunctions(
    ContactMeActionTypes,
    "post",
    apis.contactMe,
    req.payload
  )();
}

export function addAnnotation(req) {
  return sagaFunctions(
    AddAnnotationActionTypes,
    "post",
    apis.annotations(req.payload.request_id, req.payload.doc_id),
    req.payload.payload
  )();
}

export function updateAnnotation(req) {
  return sagaFunctions(
    UpdateAnnotationActionTypes,
    "put",
    apis.updateAnnotations(
      req.payload.request_id,
      req.payload.doc_id,
      req.payload.comment_id
    ),
    req.payload.payload
  )();
}

export function finalReport(req) {
  return sagaFunctions(
    FinalReportActionTypes,
    "post",
    apis.finalReport(req.payload.request_id),
    req.payload.payload,
    {
      "Content-Type": "multipart/form-data",
    }
  )();
}

export function shareReport(req) {
  return sagaFunctions(
    ShareReportActionTypes,
    "post",
    apis.shareReport,
    req.payload
  )();
}

export function getUploadTypes() {
  return sagaFunctions(UploadTypesActionTypes, "get", apis.uploadTypes)();
}

export function* addNoteToDocWatcher() {
  yield takeLatest(AddNoteToDocActionTypes.REQUEST, addNoteToDocument);
}

export function* finalReportWatcher() {
  yield takeLatest(FinalReportActionTypes.REQUEST, finalReport);
}

export function* uploadDocWatcher() {
  yield takeLatest(UploadDocActionTypes.REQUEST, uploadDoc);
}

export function* documentWriterWatcher() {
  yield takeLatest(DocWriterActionTypes.REQUEST, documentWriter);
}

export function* deleteDocWatcher() {
  yield takeLatest(DeleteDocActionTypes.REQUEST, deleteUploadDocument);
}

export function* verifyPropertyWatcher() {
  yield takeLatest(VerifyPropertyActionTypes.REQUEST, verifyProperty);
}

export function* updatePropertyWatcher() {
  yield takeLatest(VerifyPropertyActionTypes.CHANGED, updateVerifyProperty);
}

export function* fetchPropertiesWatcher() {
  yield takeLatest(FetchPropertiesActionTypes.REQUEST, fetchProperties);
}

export function* fetchPropertyWatcher() {
  yield takeLatest(FetchPropertyActionTypes.REQUEST, fetchProperty);
}

export function* contactMeWatcher() {
  yield takeLatest(ContactMeActionTypes.REQUEST, contactMe);
}

export function* getUploadTypesWatcher() {
  yield takeLatest(UploadTypesActionTypes.REQUEST, getUploadTypes);
}

export function* addAnnotationWatcher() {
  yield takeLatest(AddAnnotationActionTypes.REQUEST, addAnnotation);
}

export function* updateAnnotationWatcher() {
  yield takeLatest(UpdateAnnotationActionTypes.REQUEST, updateAnnotation);
}

export function* shareReportWatcher() {
  yield takeLatest(ShareReportActionTypes.REQUEST, shareReport);
}

export function* propertyContactSaga() {
  yield all([
    verifyPropertyWatcher(),
    contactMeWatcher(),
    uploadDocWatcher(),
    getUploadTypesWatcher(),
    fetchPropertiesWatcher(),
    fetchPropertyWatcher(),
    updatePropertyWatcher(),
    documentWriterWatcher(),
    addNoteToDocWatcher(),
    deleteDocWatcher(),
    addAnnotationWatcher(),
    updateAnnotationWatcher,
    finalReportWatcher(),
    shareReportWatcher(),
  ]);
}
