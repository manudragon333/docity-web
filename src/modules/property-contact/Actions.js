import {
  ContactMeActionTypes,
  DeleteDocActionTypes,
  FetchPropertiesActionTypes,
  FetchPropertyActionTypes,
  UploadDocActionTypes,
  UploadTypesActionTypes,
  VerifyPropertyActionTypes,
  DocWriterActionTypes,
  AddNoteToDocActionTypes,
  AddAnnotationActionTypes,
  UpdateAnnotationActionTypes,
  FinalReportActionTypes,
  ShareReportActionTypes,
} from "./ActionTypes";

export const verifyProperty = (payload) => ({
  type: VerifyPropertyActionTypes.REQUEST,
  payload,
});

export const verifyPropertyReset = () => ({
  type: VerifyPropertyActionTypes.RESET,
});

export const updateVerifyProperty = (payload) => ({
  type: VerifyPropertyActionTypes.CHANGED,
  payload,
});

export const contactMe = (payload) => ({
  type: ContactMeActionTypes.REQUEST,
  payload,
});

export const getUploadTypes = (payload) => ({
  type: UploadTypesActionTypes.REQUEST,
  payload,
});

export const fetchProperties = (filters) => ({
  type: FetchPropertiesActionTypes.REQUEST,
  filters,
});

export const fetchProperty = (payload) => ({
  type: FetchPropertyActionTypes.REQUEST,
  payload,
});

export const resetProperty = () => ({
  type: FetchPropertyActionTypes.RESET,
});

export const resetProperties = () => ({
  type: FetchPropertiesActionTypes.RESET,
});

export const uploadDoc = (payload) => ({
  type: UploadDocActionTypes.REQUEST,
  payload,
});

export const deleteDoc = (payload) => ({
  type: DeleteDocActionTypes.REQUEST,
  payload,
});

export const addNoteToDoc = (payload) => ({
  type: AddNoteToDocActionTypes.REQUEST,
  payload,
});

export const docWriter = (payload) => ({
  type: DocWriterActionTypes.REQUEST,
  payload,
});

export const resetDocWriter = () => ({
  type: DocWriterActionTypes.RESET,
});

export const addAnnotation = (payload) => ({
  type: AddAnnotationActionTypes.REQUEST,
  payload,
});

export const updateAnnotation = (payload) => ({
  type: UpdateAnnotationActionTypes.REQUEST,
  payload,
});

export const finalReport = (payload) => ({
  type: FinalReportActionTypes.REQUEST,
  payload,
});

export const shareReportRequest = (payload) => ({
  type: ShareReportActionTypes.REQUEST,
  payload,
});

export const shareReportReset = () => ({
  type: ShareReportActionTypes.RESET,
});
