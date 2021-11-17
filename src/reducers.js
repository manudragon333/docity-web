import { combineReducers } from "redux";
import { AuthReducer } from "./modules/auth";
import { CommonReducer } from "./modules/common/Reducer";
import { propertyContactReducer } from "./modules/property-contact/Reducer";
import { CivilEngReducer } from "./modules/civil-engg"
export default combineReducers({
  auth: AuthReducer,
  common: CommonReducer,
  propertyContact: propertyContactReducer,
  civilEng: CivilEngReducer
});
