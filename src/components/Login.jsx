import { useFormik } from "formik";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Close from "../assets/images/close.svg";
import WhiteClose from "../assets/images/white_close.svg";
import Logo from "../assets/images/white_docity.svg";
import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  authenticateRequest,
  loginReset,
  isLoggedInAction,
} from "../modules/auth";
import * as Yup from "yup";
import { Input } from "./FormComponents/Input";
import { alertOpen } from "../modules/common/Actions";
import { ROLE_CE /* ROLE_SUPER_ADMIN */ } from "../constants";
import { useHistory } from "react-router-dom";
import GoogleLoginIcon from "../assets/images/google-login-btn.png";
// import FacebookLoginIcon from "../assets/images/facebook_icon-icons.com_59205.png";
import FacebookLoginIcon from "../assets/images/facebook.png";

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .email("Username must be valid email")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ setOpenLogin, setOpenSignUp, setLogin, ...props }) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      props.loginReset();
      props.loginSubmit(values);
    },
    validationSchema: LoginSchema,
  });
  const history = useHistory();

  const { login } = props;

  useEffect(() => {
    if (login?.errors?.message) {
      props.loginReset();
    }
    //eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    if (login?.user) {
      setOpenLogin(false);
      localStorage.setItem("accessToken", login?.accessToken);
      localStorage.setItem("refreshToken", login?.refreshToken);
      localStorage.setItem("user", JSON.stringify(login?.user));
      if (login?.user?.role?.[0]?.name === ROLE_CE) {
        history.push("/");
      } /* else if (login?.user?.role?.[0]?.name === ROLE_SUPER_ADMIN) {
        history.push("/userProfile");
        console.log("/userProfile");
      } */ else {
        history.push("/");
      }

      props.isLoggedInAction({ isLoggedIn: true });
    }
    //eslint-disable-next-line
  }, [login]);

  const responseGoogle = (response) => {
    // console.log(response);
  };

  const responseFacebook = (response) => {
    // console.log(response);
  };
  return (
    <div className="card d-flex">
      <div className="d-flex flex-col login-side-bg">
        <div
          className="m-close-icon"
          onClick={() => {
            setOpenLogin(false);
            props.isLoggedInAction({ isLoggedIn: false });
          }}
        >
          <img src={WhiteClose} alt="close" />
        </div>
        <div className="login-side-wrap">
          <div className="logo">
            <img src={Logo} alt="DoCity" />
          </div>
          <p>
            Hello please fill up your information and start your journey with us
          </p>
        </div>
      </div>
      <div className="w50 m100">
        <form className="login-form" onSubmit={formik.handleSubmit}>
          <h3>Login</h3>
          <div
            className="close-icon"
            onClick={() => {
              setOpenLogin(false);
              props.isLoggedInAction({ isLoggedIn: false });
            }}
          >
            <img src={Close} alt="close" />
          </div>
          <Input
            name="userName"
            label="Username"
            formik={formik}
            placeholder="Enter email"
          />
          <Input
            name="password"
            label="Password"
            formik={formik}
            type={"password"}
            placeholder="Enter password"
          />
          {login?.errors?.message && (
            <div className="errorMsg">{login?.errors?.message}</div>
          )}
          <div className="button-wrap mt1">
            <button
              type="submit"
              className={`primary-color w100 ${
                props.login?.loading ? "loadBtn" : ""
              }`}
            >
              {props.login?.loading ? "Processing..." : "LOGIN"}
            </button>
          </div>
        </form>
        {/*   <div className="d-flex" style={{ justifyContent: "center" }}>
          <GoogleLogin
            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="google-login-btn"
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
              >
                <img
                  src={GoogleLoginIcon}
                  alt="google-login"
                  style={{
                    height: "30px",
                    width: "30px",
                    margin: "0 10px 0 0",
                  }}
                />
                Login with Google
              </button>
            )}
            // buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <br />
        <div className="d-flex" style={{ justifyContent: "center" }}>
          <FacebookLogin
            appId="1088597931155576"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={componentClicked}
            render={(renderProps) => (
              <button
                className="facebook-login-btn"
                onClick={renderProps.onClick}
              >
                <img
                  src={FacebookLoginIcon}
                  alt="facebook-login"
                  style={{ height: "30px", width: "30px", margin: "0 10px", objectFit: "cover" }}
                />
                Login with Facebook
              </button>
            )}
            callback={responseFacebook}
          />
        </div>
         */}
        <p className="align-center mt1 text-gray light-bold cursor">
          Don't have account? Please{" "}
          <span
            className="text-blue"
            onClick={() => {
              setOpenSignUp(true);
              setOpenLogin(false);
            }}
          >
            Sign Up
          </span>
        </p>
        <p
          className="align-center mt1 mb2 text-dark-gray light-bold cursor"
          onClick={() => {
            setOpenLogin(false);
            props.setOpenForgetPassword(true);
          }}
        >
          Forgot password?
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state?.auth?.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginSubmit: (values) => {
        return authenticateRequest(values);
      },
      loginReset,
      alertOpen,
      isLoggedInAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
