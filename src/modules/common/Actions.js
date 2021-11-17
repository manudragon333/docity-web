import {
  AlertActionTypes,
  PropertyActionTypes,
  RegionActionTypes,
  ContactUsActionTypes,
  QueryTypesActionTypes,
} from "./ActionTypes";

export const alertOpen = (payload) => ({
  type: AlertActionTypes.ALERT_OPEN,
  payload,
});

export const alertClose = () => ({
  type: AlertActionTypes.ALERT_CLOSE,
});

export const getPropertyTypes = () => ({
  type: PropertyActionTypes.REQUEST,
});

export const getRegions = () => ({
  type: RegionActionTypes.REQUEST,
});

export const contactUsRequest = () => ({
  type: ContactUsActionTypes.REQUEST,
});

export const contactUsReset = () => ({
  type: ContactUsActionTypes.RESET,
});

export const getQueryTypes = () => ({
  type: QueryTypesActionTypes.REQUEST,
});
