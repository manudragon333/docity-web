import React, { Component, useEffect, useState } from "react";
import "./App.css";
import "./AppMobile.css";
import { Provider } from "react-redux";
import store from "./store";
// import Routes from "./Routes";
// import WhiteNavBar from "./components/WhiteNavBar";
import { Spinner } from "./components/FinalReportGeneration";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SectionOne from "./components/SectionOne";
import Steps from "./components/Steps";
import CivilEnggProfile from "./components/CivilEnggProfile";
import UserProfile from "./components/UserProfile";
import Requests from "./components/Requests";
import ViewRequest from "./components/ViewRequest";
import UserProfileEdit from "./components/UserProfileEdit";
import Resources from "./components/Resources";
import FAQ from "./components/Faq";
import AboutUs from "./components/AboutUs";
import Video from "./components/Video";
import { getUser, getAccessToken, getRefreshToken } from "./utils/utils";
import { AuthenticateActionTypes } from "./modules/auth";
import CivilEnggProfileEdit from "./components/CivilEnggProfileEdit";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import { ROLE_CE } from "./constants";
import OurProcessPage from "./components/OurProcessPage";
import ContactUs from "./components/ContactUs";

const AuthComponentWrapper = ({ Child }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let accessToken = localStorage.getItem("accessToken");
    let refreshToken = localStorage.getItem("refreshToken");
    if (accessToken === null || refreshToken === null) {
      window.location.href = "/";
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div className="flex-center relative">
      <div className="mt8 t8 pSticky">
        <Spinner />
      </div>
    </div>
  ) : (
    <Child />
  );
};
class App extends Component {
  async componentDidMount() {
    if (getUser()) {
      store.dispatch({
        type: AuthenticateActionTypes.SUCCESS,
        payload: {
          user: getUser(),
          accessToken: getAccessToken(),
          refreshToken: getRefreshToken(),
        },
      });
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/steps" render={(Rprops) => <Steps {...Rprops} />} />
            <Route exact path="/civilEnggProfile">
              <AuthComponentWrapper Child={CivilEnggProfile} />
            </Route>
            <Route exact path="/civilEnggProfileEdit">
              <AuthComponentWrapper Child={CivilEnggProfileEdit} />
            </Route>
            <Route exact path="/viewRequest/:id" component={ViewRequest} />
            <Route exact path="/userProfile">
              <AuthComponentWrapper Child={UserProfile} />
            </Route>
            <Route exact path="/userProfileEdit">
              <AuthComponentWrapper Child={UserProfileEdit} />
            </Route>
            <Route exact path="/requests">
              <AuthComponentWrapper Child={Requests} />
            </Route>
            <Route exact path="/faq" component={FAQ} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/ourProcess" component={OurProcessPage} />
            <Route exact path="/privacypolicy" component={PrivacyPolicy} />
            <Route
              exact
              path="/termsandconditions"
              component={TermsAndConditions}
            />
            <Route
              exact
              path="/video"
              render={(props) => {
                if (getUser() && getUser()?.role[0]?.name !== ROLE_CE) {
                  return <Redirect to={"/"} />;
                }
                return <AuthComponentWrapper Child={Video} /> &&
                  getUser() &&
                  getUser()?.role[0]?.name === ROLE_CE ? (
                  <Video {...props} />
                ) : (
                  <Redirect to={"/"} />
                );
              }}
            />
            {/* <AuthComponentWrapper Child={Video} />
            </Route> */}

            <Route exact path="/resources" component={Resources} />
            <Route exact path="/" component={SectionOne} />
            <Route exact path="/resetPassword">
              <AuthComponentWrapper Child={SectionOne} />
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
