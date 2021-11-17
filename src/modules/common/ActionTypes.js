import { ActionTypesFactory } from "../../utils/redux";

export const AlertActionTypes = {
  ALERT_OPEN: "ALERT_OPEN",
  ALERT_CLOSE: "ALERT_CLOSE",
};

export const PropertyActionTypes = ActionTypesFactory("Masterdata", "Property");
export const RegionActionTypes = ActionTypesFactory("Masterdata", "Region");

export const ContactUsActionTypes = ActionTypesFactory(
  "Masterdata",
  "ContactUs"
);
export const QueryTypesActionTypes = ActionTypesFactory(
  "Masterdata",
  "QueryTypes"
);
