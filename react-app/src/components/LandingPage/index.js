import React from "react";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import LoginFormPage from "../LoginFormPage";
import logo from "../../utilities/logo.png";
import landingImage from "../../utilities/office.png";
import "./app.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import background from "../../utilities/calendar.png";
import work from '../../utilities/work.png'
import users from '../../utilities/user.png'
const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    closeModal();
    history.push("/");
  };

  return (
    <>
      <div className="land-main-cion">
        {/* <nav className="land-nav-cont">
                <div className="land-logo">
                    <img src={logo} />

                </div>
            </nav> */}
        <div className="landing-body-cont">
          <div>
            <h1 className="heading-landing-page">Job Sphere</h1>
          </div>
          <div className="landing-body-description">
            <div className="landing-bod-content">
              <div className="landing-description">
                <p className="landing-heading">Job Management Platform</p>
              </div>
              <div>
                <div className="landing-btns">
                  <button>
                    <OpenModalButton
                      buttonText="login"
                      modalComponent={<LoginFormPage />}
                    />
                  </button>
                  <button>
                    <OpenModalButton
                      buttonText="Sign Up"
                      modalComponent={<SignupFormModal />}
                    />
                  </button>
                </div>
                <div className="landing-demo-button">
                  <button onClick={demoLogin}>Demo User</button>
                </div>
                <div className="card-container-landing">
                  <div className="card card-social">
                  <div className="card-cont ">
                      <div>
                        <h1>Social Network</h1>
                      </div>
                      <div>
                        <p>Network with Peers</p>
                      </div>
                      <div className="card-img-cont">
                        <img className="card-img-job" src={users}/>
                      </div>
                    </div>
                  </div>
                  <div className="card card-work">
                    <div className="card-cont ">
                      <div>
                        <h1>Discover Jobs</h1>
                      </div>
                      <div>
                        <p>Discover Career Oppertunities</p>
                      </div>
                      <div className="card-img-cont">
                        <img className="card-img-job" src={work}/>
                      </div>
                    </div>
                  </div>
                  <div className="card card-calander">
                    <div className="card-cont ">
                      <div>
                        <h1>Interview Tracking</h1>
                      </div>
                      <div>
                        <p>Stay up to date with interview process </p>
                      </div>
                      <div className="card-img-cont">
                        <img className="card-img" src={background} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
