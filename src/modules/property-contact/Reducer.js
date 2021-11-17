import { AssignCEActionTypes } from "../civil-engg";
import {
  ContactMeActionTypes,
  UploadTypesActionTypes,
  VerifyPropertyActionTypes,
  FetchPropertiesActionTypes,
  FetchPropertyActionTypes,
  UploadDocActionTypes,
  DeleteDocActionTypes,
  DocWriterActionTypes,
  AddNoteToDocActionTypes,
  AddAnnotationActionTypes,
  FinalReportActionTypes,
  ShareReportActionTypes,
} from "./ActionTypes";

const InitialState = {
  verifyProperty: {},
  contactMe: {},
  uploadTypes: {},
  properties: {},
  property: {},
  uploadDoc: {},
  deleteDoc: {},
  docWriter: {},
  addNoteToDoc: {},
  addAnnotation: {},
  updateAnnotation: {},
  finalReport: {},
  shareReport: {},
};

export const propertyContactReducer = (state = InitialState, action) => {
  switch (action.type) {
    case VerifyPropertyActionTypes.REQUEST:
      return {
        ...state,
        verifyProperty: { loading: true },
      };
    case VerifyPropertyActionTypes.CHANGED:
      return {
        ...state,
        verifyProperty: { loading: true },
      };
    case VerifyPropertyActionTypes.SUCCESS:
      return {
        ...state,
        verifyProperty: { loading: false, success: true },
        property: {
          ...action.payload,
          loading: false,
          success: true,
        },
      };
    case VerifyPropertyActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        verifyProperty: {
          errors: { ...payload },
          loading: false,
          success: false,
        },
      };
    }
    case VerifyPropertyActionTypes.RESET: {
      return {
        ...state,
        verifyProperty: {},
      };
    }

    case FetchPropertiesActionTypes.REQUEST:
      return {
        ...state,
        properties: { ...state.properties, loading: true },
      };
    case FetchPropertiesActionTypes.SUCCESS: {
      if (state?.properties?.data?.list) {
        action.payload.list = [
          ...state?.properties?.data?.list,
          ...action.payload.list,
        ];
      }
      return {
        ...state,
        properties: {
          data: action.payload,
          loading: false,
          success: true,
        },
      };
    }
    case FetchPropertiesActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        properties: {
          errors: { ...payload },
          loading: false,
          success: false,
        },
      };
    }

    case FetchPropertiesActionTypes.RESET: {
      return {
        ...state,
        properties: {
          loading: false,
        },
      };
    }

    case AssignCEActionTypes.SUCCESS:
      return {
        ...state,
        property: {
          ...state.property,
          ...action.payload,
          loading: false,
          success: true,
        },
      };

    case FetchPropertyActionTypes.REQUEST:
      return {
        ...state,
        property: { ...state.property, loading: true },
      };
    case FetchPropertyActionTypes.SUCCESS:
      return {
        ...state,
        property: {
          ...action.payload,
          loading: false,
          success: true,
        },
      };
    case FetchPropertyActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        property: {
          errors: { ...payload },
          loading: false,
          success: false,
        },
      };
    }

    case FetchPropertyActionTypes.RESET: {
      return {
        ...state,
        property: {
          loading: false,
        },
      };
    }

    case FetchPropertyActionTypes.custom("RESET_REQ_VERIFY_FORM_VALUES"): {
      return {
        ...state,
        reqFormVals: {},
      };
    }

    case FetchPropertyActionTypes.custom("REQ_VERIFY_FORM_VALUES"): {
      return {
        ...state,
        reqFormVals: {
          ...action.payload,
        },
      };
    }

    case UploadDocActionTypes.REQUEST:
      return {
        ...state,
        uploadDoc: { loading: true },
      };
    case UploadDocActionTypes.SUCCESS: {
      let property = state.property;
      if (
        property?.documents[action?.payload?.[0]?.attachmentType?.name]
          ?.length > 0
      ) {
        var foundIndex = property?.documents[
          action?.payload?.[0]?.attachmentType?.name
        ]?.findIndex((x) => x.id === action.payload?.[0].id);
        if (foundIndex >= 0) {
          property.documents[action?.payload?.attachmentType?.name][
            foundIndex
          ] = action.payload[0];
        } else {
          let objs =
            property.documents[action?.payload?.[0]?.attachmentType?.name];
          property.documents[action?.payload?.[0]?.attachmentType?.name] = [
            ...objs,
            action?.payload?.[0],
          ];
        }
      } else {
        property.documents[action?.payload?.[0]?.attachmentType?.name] =
          action.payload;
      }
      return {
        ...state,
        uploadDoc: { loading: false, success: true },
      };
    }
    case UploadDocActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        uploadDoc: { loading: false, errors: { ...payload }, success: false },
      };
    }

    case AddAnnotationActionTypes.REQUEST:
      return {
        ...state,
        addAnnotation: { loading: true },
      };
    case AddAnnotationActionTypes.SUCCESS:
      return {
        ...state,
        addAnnotation: { loading: false, success: true },
      };
    case AddAnnotationActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        addAnnotation: {
          loading: false,
          errors: { ...payload },
          success: false,
        },
      };
    }

    case AddNoteToDocActionTypes.REQUEST:
      return {
        ...state,
        addNoteToDoc: { loading: true },
      };
    case AddNoteToDocActionTypes.SUCCESS: {
      let property = state.property;
      if (
        property?.documents[action?.payload?.[0]?.attachmentType?.name]
          ?.length > 0
      ) {
        let foundIndex = property?.documents[
          action?.payload?.[0]?.attachmentType?.name
        ].findIndex((x) => x.id === action.payload.id);
        if (foundIndex >= 0) {
          property.documents[action?.payload?.[0]?.attachmentType?.name][
            foundIndex
          ] = action.payload;
        }
      } else {
        property.documents[action?.payload?.[0]?.attachmentType?.name] = [
          action.payload,
        ];
      }
      return {
        ...state,
        addNoteToDoc: { loading: false, success: true },
        property,
      };
    }
    case AddNoteToDocActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        addNoteToDoc: {
          loading: false,
          errors: { ...payload },
          success: false,
        },
      };
    }

    case DeleteDocActionTypes.REQUEST:
      return {
        ...state,
        deleteDoc: { loading: true },
      };
    case DeleteDocActionTypes.SUCCESS: {
      let property = state.property;
      if (property?.documents[action?.payload?.name]?.length > 0) {
        let foundIndex = property?.documents[action?.payload?.name]?.findIndex(
          (x) => x.id === action.payload?.doc_id
        );
        if (foundIndex !== -1) {
          property?.documents[action?.payload?.name]?.splice(foundIndex, 1);
        }
      }
      return {
        ...state,
        deleteDoc: { loading: false, success: true },
      };
    }
    case DeleteDocActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        deleteDoc: { loading: false, errors: { ...payload }, success: false },
      };
    }

    case FinalReportActionTypes.REQUEST:
      return {
        ...state,
        finalReport: { loading: true },
      };
    case FinalReportActionTypes.SUCCESS:
      return {
        ...state,
        finalReport: { ...action.payload, loading: false, success: true },
      };
    case FinalReportActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        finalReport: { loading: false, errors: { ...payload }, success: false },
      };
    }
    case FinalReportActionTypes.RESET:
      return {
        ...state,
        finalReport: { loading: false },
      };
    case DocWriterActionTypes.REQUEST:
      return {
        ...state,
        docWriter: { loading: true },
      };
    case DocWriterActionTypes.SUCCESS:
      return {
        ...state,
        docWriter: { loading: false, success: true },
        property: {
          ...action.payload,
          loading: false,
          success: true,
        },
      };
    case DocWriterActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        docWriter: { loading: false, errors: { ...payload }, success: false },
      };
    }

    case DocWriterActionTypes.RESET: {
      return {
        ...state,
        docWriter: { loading: false },
      };
    }

    case ContactMeActionTypes.REQUEST:
      return {
        ...state,
        contactMe: { loading: true },
      };
    case ContactMeActionTypes.SUCCESS:
      return {
        ...state,
        contactMe: {
          data: action.payload,
          loading: false,
          success: true,
        },
      };
    case ContactMeActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        contactMe: {
          errors: { ...payload },
          loading: false,
          success: false,
        },
      };
    }

    case UploadTypesActionTypes.REQUEST:
      return {
        ...state,
        uploadTypes: { loading: true },
      };
    case UploadTypesActionTypes.SUCCESS:
      return {
        ...state,
        uploadTypes: {
          data: action.payload?.list,
          loading: false,
          success: true,
        },
      };
    case UploadTypesActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        uploadTypes: {
          errors: { ...payload },
          loading: false,
          success: false,
        },
      };
    }

    case ShareReportActionTypes.REQUEST: {
      return {
        ...state,
        shareReport: { loading: true },
      };
    }
    case ShareReportActionTypes.SUCCESS: {
      return {
        ...state,
        shareReport: { ...action.payload, loading: false, success: true },
      };
    }
    case ShareReportActionTypes.FAILED: {
      let payload = action?.payload?.response?.data?.errors?.[0];
      return {
        ...state,
        shareReport: { errors: { ...payload }, loading: false },
      };
    }

    case ShareReportActionTypes.RESET: {
      return {
        ...state,
        shareReport: { loading: false },
      };
    }

    default:
      return state;
  }
};
