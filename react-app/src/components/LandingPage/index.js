import React from "react"
import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import SignupFormModal from "../SignupFormModal"
import LoginFormPage from "../LoginFormPage"





const LandingPage = () => {
    return <>
    <div>
        <nav>
            <div className="land-logo">
                {/* <img></img> */}
                <div>hello</div>
                
            </div>
        </nav>
    </div>
    <div>This is the homepage...Trust me</div>
    <button>
        <OpenModalButton
        buttonText='login'
        modalComponent={<LoginFormPage />}
        />
    </button>
    </>
}

export default LandingPage