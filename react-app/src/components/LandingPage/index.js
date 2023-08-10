import React from "react"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import LoginFormPage from "../LoginFormPage"
import logo from "../../utilities/logo.png"
import landingImage from "../../utilities/office.png"
import './app.css'





const LandingPage = () => {
    return <>
        <div className="land-main-cion">
            <nav className="land-nav-cont">
                <div className="land-logo">
                    <img src={logo} />

                </div>
            </nav>
            <div className="landing-body-cont">
                <div className="landing-body-description">
                    <div className="landing-bod-content">

                        <div className="landing-description">
                            <p className="landing-heading">Job <span>Management</span> App</p>
                            <p className="landing-desc-text">JobSphere is a comprehensive job search and networking platform that empowers job seekers to streamline their job search, connect with industry professionals, and keep track of their interview progress.</p>
                        </div>
                        <div>
                            <div className="landing-btns">
                                <button>
                                    <OpenModalButton
                                        buttonText='login'
                                        modalComponent={<LoginFormPage />}
                                    />
                                </button>
                                <button>
                                    <OpenModalButton
                                        buttonText='Sign Up'
                                        modalComponent={<SignupFormModal />}
                                    />
                                </button>
                            </div>
                            <div className="landing-demo-button">
                                <button>Demo User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="landing-img">
                    <img src={landingImage} />
                </div>




            </div>
        </div>

    </>
}

export default LandingPage