/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
// import Logo from "../assets/images/white_docity.svg";
// import LogOut from "../assets/images/log-out-white.svg";
import Phone from "../assets/images/whatsapp_icon.png";

import Popup from "reactjs-popup";
import Login from "./Login";
import SignUp from "./SignUp";
import { useHistory, useLocation } from "react-router-dom";
import Profile from "../assets/images/user.svg";
import DownArrowWhite from "../assets/images/down_arrow_white.svg";
import ForgetPassword from "./ForgotPassword";
import { connect } from "react-redux";
import { isLoggedInAction, verifyToken } from "../modules/auth";
import { bindActionCreators } from "redux";
import { ROLE_CE, ROLE_SUPER_ADMIN } from "../constants";
import { getUser } from "../utils/utils";
import PasswordReset from "./PasswordReset";
import { alertOpen } from "../modules/common";
import FAQ from "../assets/images/FAQ.svg";
import AboutUs from "../assets/images/About.svg";
import Home from "../assets/images/Home.svg";
import Request from "../assets/images/Request.svg";
import Logout from "../assets/images/logout.svg";
import Hamburger from "../assets/images/Hamburger.svg";
import logindesktop from "../assets/images/Login.svg";
import docitylogo from "../assets/images/DocityLogo1.svg";
// import Logout from "../assets/images/logout.svg";
// import LogoutIcon from "../assets/images/logout-icon.svg";
import ProfileIcon from "../assets/images/Profile.svg";
import ContactUs from "../assets/images/Contact.svg";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const NavBar = (props) => {
  const history = useHistory();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [openForgetPassword, setOpenForgetPassword] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [showDropdown, setshowDropdown] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const type = query.get("type");

  useEffect(() => {
    if (props?.userDetails?.accessToken) {
      setLogin(true);
      props.isLoggedInAction({ isLoggedIn: true });
    }
    //eslint-disable-next-line
  }, [props.userDetails]);

  useEffect(() => {});

  useEffect(() => {
    if (type === "CE") {
      props.verifyToken(token);
      setOpenSignUp(true);
    } else if (location.pathname.includes("resetPassword")) {
      setOpenResetPassword(true);
    } else if (type === "ACTIVATE_EMAIL") {
      props.alertOpen({
        title: "",
        msg: "Thank you for choosing DoCity",
        open: true,
        action: () => {
          history.replace("/");
        },
      });
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      props?.isLoggedIn?.isLoggedIn === false &&
      location.pathname === "/" &&
      props?.isLoggedIn?.from === "reqForm"
    ) {
      setOpenLogin(true);
    }
    //eslint-disable-next-line
  }, [props.isLoggedIn]);
  const isActive = useMediaQuery("(max-width: 480px)");

  return (
    <>
      <nav className="nav-bar d-flex space-between">
        <div className="d-flex">
          <div className="logo">
            <div
              className="hamburger"
              onClick={() => setOpenSideBar(!openSideBar)}
            >
              <img src={Hamburger} className="ham" alt="" />

              {isActive && (
                <Drawer
                  anchor={"left"}
                  open={openSideBar}
                  onClose={(e) => setOpenSideBar(!openSideBar)}
                >
                  <ul className="menu__box">
                    {login ? (
                      props?.userDetails?.user?.role?.[0]?.name === ROLE_CE ? (
                        <li
                          className="profile-mobile"
                          onClick={() => {
                            history.push("/civilEnggProfile");
                          }}
                        >
                          <a className="menu__item prfoile-name-mobile">
                            <img
                              src={
                                imgErr ||
                                !props?.userDetails?.user?.profileImage
                                  ? Profile
                                  : props?.userDetails?.user?.profileImage
                              }
                              alt="Profile"
                              className="profile-pic"
                              onError={() => {
                                setImgErr(true);
                              }}
                            />
                            {props?.userDetails?.user?.fullName}
                          </a>
                        </li>
                      ) : (
                        <li
                          className="profile-mobile"
                          onClick={() => {
                            history.push("/userProfile");
                          }}
                        >
                          <a className="menu__item prfoile-name-mobile">
                            <img
                              src={
                                imgErr ||
                                !props?.userDetails?.user?.profileImage
                                  ? Profile
                                  : props?.userDetails?.user?.profileImage
                              }
                              alt="Profile"
                              className="profile-pic"
                              onError={() => {
                                setImgErr(true);
                              }}
                            />
                            {props?.userDetails?.user?.fullName}
                          </a>
                        </li>
                      )
                    ) : (
                      <li className="profile-mobile ">
                        <a className="menu__item prfoile-name-mobile">
                          <img
                            src={
                              imgErr || !props?.userDetails?.user?.profileImage
                                ? Profile
                                : props?.userDetails?.user?.profileImage
                            }
                            alt="Profile"
                            className="profile-pic"
                            onError={() => {
                              setImgErr(true);
                            }}
                          />
                          Hello Guest
                        </a>
                      </li>
                    )}
                    <li
                      className={location.pathname === "/" ? "" : ""}
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      <a className="menu__item">
                        <img className="drawer-icons" src={Home} alt="Home" />
                        Home
                      </a>
                    </li>

                    <li
                      className={location.pathname === "/faq" ? "" : ""}
                      onClick={() => {
                        history.push("/faq");
                      }}
                    >
                      <a className="menu__item">
                        <img className="drawer-icons" src={FAQ} alt="Faq" />
                        FAQ
                      </a>
                    </li>
                    <li
                      className={location.pathname === "/aboutus" ? "" : ""}
                      onClick={() => {
                        history.push("/aboutus");
                      }}
                    >
                      <a className="menu__item">
                        <img
                          className="drawer-icons"
                          src={AboutUs}
                          alt="about us"
                        />
                        About Us
                      </a>
                    </li>

                    <li
                      className={location.pathname === "/contactus" ? "" : ""}
                      onClick={() => {
                        history.push("/contactus");
                      }}
                    >
                      <a className="menu__item">
                        <img
                          className="drawer-icons"
                          src={ContactUs}
                          alt="about us"
                        />
                        Contact Us
                      </a>
                    </li>

                    {login ? (
                      <li
                        className={`cursor ${
                          props.showCE || props.showCE === undefined ? "" : ""
                        }`}
                        onClick={() => {
                          history.push("/requests");
                        }}
                      >
                        <a className="menu__item">
                          <img
                            className="drawer-icons"
                            src={Request}
                            alt="Home"
                          />
                          Requests
                        </a>
                      </li>
                    ) : (
                      ""
                    )}

                    {login && getUser()?.role?.[0].name === ROLE_SUPER_ADMIN ? (
                      <li
                        className={`cursor ${props.showCE ? "" : ""}`}
                        onClick={() => {
                          history.push("/requests", { showCE: true });
                        }}
                      >
                        <a className="menu__item">
                          <img
                            className="drawer-icons"
                            src={ProfileIcon}
                            alt="Home"
                          />
                          Civil Engineer Profiles
                        </a>
                      </li>
                    ) : (
                      ""
                    )}

                    {login ? (
                      <li
                        onClick={() => {
                          localStorage.clear();
                          window.location.href = "/";
                        }}
                      >
                        <a className="menu__item">
                          <img
                            className="drawer-icons"
                            src={Logout}
                            alt="logout"
                          />
                          Logout
                        </a>
                      </li>
                    ) : (
                      <li>
                        <button
                          className="menu__item"
                          onClick={() => {
                            setOpenLogin(true);
                          }}
                        >
                          <img
                            className="drawer-icons"
                            src={logindesktop}
                            alt="login"
                          />
                          Login
                        </button>
                      </li>
                    )}
                  </ul>
                </Drawer>
              )}
            </div>

            <img
              src={docitylogo}
              alt="DoCity"
              onClick={() => {
                history.push("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>

          <ul className="links">
            {/* <li
              className={location.pathname === "/resources" ? "" : "dim-text"}
              onClick={() => {
                history.push("/resources");
              }}
            >
              Resources
            </li> */}
            <li
              className={location.pathname === "/faq" ? "" : ""}
              onClick={() => {
                history.push("/faq");
              }}
            >
              FAQ
            </li>

            <li
              className={location.pathname === "/aboutus" ? "" : ""}
              onClick={() => {
                history.push("/aboutus");
              }}
            >
              About Us
            </li>
            <li
              className={location.pathname === "/contactus" ? "" : ""}
              onClick={() => {
                history.push("/contactus");
              }}
            >
              Contact Us
            </li>
          </ul>
        </div>
        <ul className="user-phone">
          <li>
            <img src={Phone} alt="Phone" className="phone" style={{maxWidth:"28px"}} />
            <span className="phone-text">+91 78934-12266</span>
          </li>
          {login ? (
            <>
              <li className="flex-center cursor mobile-profile-view">
                <img
                  src={
                    imgErr || !props?.userDetails?.user?.profileImage
                      ? Profile
                      : props?.userDetails?.user?.profileImage
                  }
                  alt="Profile"
                  className="profile-pic"
                  onClick={() => {
                    if (props?.userDetails?.user?.role?.[0]?.name === ROLE_CE) {
                      history.push("/civilEnggProfile");
                    } else {
                      history.push("/userProfile");
                    }
                  }}
                  onError={() => {
                    setImgErr(true);
                  }}
                />
                <span
                  className="nav-name"
                  onClick={() => {
                    if (props?.userDetails?.user?.role?.[0]?.name === ROLE_CE) {
                      history.push("/civilEnggProfile");
                    } else {
                      history.push("/userProfile");
                    }
                  }}
                >
                  {props?.userDetails?.user?.fullName}
                </span>
                <img
                  src={DownArrowWhite}
                  alt="DownArrow"
                  className="nav-down cursor"
                  onClick={() => {
                    setshowDropdown(!showDropdown);
                  }}
                />
                {showDropdown && (
                  <div className="relative">
                    <div className="menu-dropdown">
                      <span
                        onClick={() => {
                          localStorage.clear();
                          window.location.href = "/";
                        }}
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                )}
              </li>
              {/*  <a
                className="menu__item"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                <img
                  className="drawer-icons"
                  src={LogoutIcon}
                  alt="logout"
                  style={{ height: "25px" }}
                />
              </a> */}
            </>
          ) : (
            <li className="desktopLogin">
              <button
                className="primary-color"
                onClick={() => {
                  setOpenLogin(true);
                }}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Popup
        open={openLogin}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 740 }}
        overlayStyle={{
          background: "rgba(0,0,0,0.7)",
        }}
        lockScroll={true}
      >
        <Login
          setOpenLogin={setOpenLogin}
          setOpenSignUp={setOpenSignUp}
          setLogin={setLogin}
          setOpenForgetPassword={setOpenForgetPassword}
        />
      </Popup>
      <Popup
        open={openSignUp}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 740 }}
        overlayStyle={{
          background: "rgba(0,0,0,0.7)",
        }}
        lockScroll={true}
      >
        <SignUp
          setOpenLogin={setOpenLogin}
          setOpenSignUp={setOpenSignUp}
          token={token}
          type={type}
        />
      </Popup>
      <PasswordReset
        open={openResetPassword}
        setOpen={setOpenResetPassword}
        token={token}
      />
      <ForgetPassword
        open={openForgetPassword}
        setOpen={setOpenForgetPassword}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state?.auth?.userDetails,
    isLoggedIn: JSON.parse(JSON.stringify(state?.auth?.isLoggedIn)),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { isLoggedInAction, verifyToken, alertOpen },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
