import './app.css'
import profilePic from '../../utilities/profile-pic.jpg'

const AboutMe =  () =>  {
    return <>
    <div className="about-me-main-cont">
        <div className="about-me-upper">
            <div className="about-me-left">
                <img className='profile-pic'src={profilePic}></img>
            </div>
            <div className="about-me-right">
                <div>
                    <p className='about-me-name'>Ahmad Shaukat</p>
                </div>
                <div>
                    <p className='about-me-subheading'>A Bit About Me</p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at sem eget quam tristique tristique. Nunc tincidunt, libero nec ullamcorper laoreet, massa elit fermentum nulla, vel convallis nulla nisi at risus. Nulla facilisi. Sed tincidunt ipsum vel sapien tincidunt, non egestas dui eleifend. Quisque vel vehicula orci, vel iaculis ipsum. Suspendisse potenti. Maecenas fringilla, ipsum eget suscipit sollicitudin, odio urna pharetra lectus, vel tincidunt sapien turpis eget risus. Suspendisse potenti.</p>
                </div>
            </div>

        </div>
        <div className="about-me-bottom">
            <a className='about-me-links about-me-portfolio' href='https://www.google.com/' target='_black'>Portfolio</a>
            <a className='about-me-links about-me-github'>GitHub</a>
            <a className='about-me-links about-me-resume'>Resume</a>
        </div>
    </div>
    
    
    </>
}

export default AboutMe