/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
// import Logo from "../assets/images/blue_docity.svg";
// import LogoutIcon from "../assets/images/log-out1.svg";
// import Phone from "../assets/images/dark_phone.svg";
import Phone from "../assets/images/whatsapp_icon.png";
import DownArrow from "../assets/images/down_arrow.svg";
// import LogOut from "../assets/images/log-out.svg";
import Profile from "../assets/images/user.svg";
import { ROLE_CE, ROLE_SUPER_ADMIN } from "../constants";
import { getUser } from "../utils/utils";
import Login from "./Login";
import SignUp from "./SignUp";
import FAQ from "../assets/images/FAQ.svg";
import AboutUs from "../assets/images/About.svg";
import Home from "../assets/images/Home.svg";
import Request from "../assets/images/Request.svg";
import Logout from "../assets/images/logout.svg";
import Hamburger from "../assets/images/Hamburger.svg";
import docitylogo from "../assets/images/DocityLogo1.svg";
import ProfileIcon from "../assets/images/Profile.svg";
import ContactUs from "../assets/images/Contact.svg";
import Drawer from "@material-ui/core/Drawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const NavBar = (props) => {
  const history = useHistory();
  const [openLogin, setOpenLogin] = useState(false);
  const [showDropdown, setshowDropdown] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const location = useLocation();
  const [openSideBar, setOpenSideBar] = useState(false);
  const isActive = useMediaQuery("(max-width: 480px)");
  return (
    <div className={`nav-shadow ${props.boxShadowBottom ? "bs-bottom" : ""}`}>
      <nav id="navbar" className="nav-bar d-flex space-between white-nav">
        <div className="d-flex">
          <div className="logo">
            <div
              className="hamburger"
              onClick={() => setOpenSideBar(!openSideBar)}
            >
              <img src={Hamburger} className="ham" alt="hamburger" />

              {isActive && (
                <Drawer
                  anchor={"left"}
                  open={openSideBar}
                  onClose={(e) => setOpenSideBar(!openSideBar)}
                >
                  <ul className="menu__box">
                    {props?.userDetails?.user?.role?.[0]?.name === ROLE_CE ? (
                      <li
                        className="profile-mobile"
                        onClick={() => {
                          history.push("/civilEnggProfile");
                        }}
                      >
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
                          {props?.userDetails?.user?.fullName}
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

                    <li
                      className={`cursor ${
                        props.showCE || props.showCE === undefined ? "" : ""
                      }`}
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
                    {getUser()?.role?.[0].name === ROLE_SUPER_ADMIN && (
                      <li
                        className={`cursor ${props.showCE ? "" : ""}`}
                        onClick={() => {
                          history.push("/requests", {
                            showCE: true,
                          });
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
                    )}
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
                  </ul>
                </Drawer>
              )}
            </div>
            <img
              className="profile-logo"
              src={docitylogo}
              alt="DoCity"
              onClick={() => {
                history.push("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </div>

          <ul className={"links"}>
            <li
              className="dim-text"
              onClick={() => {
                history.push("/");
              }}
            >
              Home
            </li>
            <li
              className={`cursor ${
                props.showCE || props.showCE === undefined ? "dim-text" : ""
              }`}
              onClick={() => {
                history.push("/requests");
              }}
            >
              Requests
            </li>
            {getUser()?.role?.[0].name === ROLE_SUPER_ADMIN && (
              <li
                className={`cursor ${props.showCE ? "" : "dim-text"}`}
                onClick={() => {
                  history.push("/requests", {
                    showCE: true,
                  });
                }}
              >
                Civil Engineer Profiles
              </li>
            )}
          </ul>
        </div>
        <ul className="user-phone">
          <li>
            <img src={Phone} alt="Phone" className="phone" style={{maxWidth:"20px"}} />
            <span className="phone-text">+91 78934-12266</span>
          </li>
          <li
            className="flex-center cursor mobile-profile-view"
            onClick={() => {
              if (props?.userDetails?.user?.role?.[0]?.name === ROLE_CE) {
                history.push("/civilEnggProfile");
              } else {
                history.push("/userProfile");
              }
            }}
          >
            <img
              src={
                props?.userDetails?.user?.profileImage
                  ? props?.userDetails?.user?.profileImage
                  : Profile
              }
              alt="Profile"
              className="profile-pic"
            />
            <span className="nav-name">
              {props?.userDetails?.user?.fullName}
            </span>

            <img
              src={DownArrow}
              alt="DownArrow"
              className="nav-down pLRHalf"
              onClick={() => {
                setshowDropdown(!showDropdown);
              }}
            />
            {showDropdown && (
              <div className="relative">
                <div className="menu-dropdown-white">
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
            {/*     <a
              className="logout_item"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              <img
                className="logout-icon"
                src={LogoutIcon}
                alt="logout"
              />
              Logout
            </a> */}
          </li>
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
      >
        <Login setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} />
      </Popup>
      <Popup
        open={openSignUp}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        contentStyle={{ width: 740 }}
        overlayStyle={{
          background: "rgba(0,0,0,0.7)",
        }}
      >
        <SignUp setOpenLogin={setOpenLogin} setOpenSignUp={setOpenSignUp} />
      </Popup>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state?.auth?.userDetails,
  };
};

export default connect(mapStateToProps)(NavBar);
