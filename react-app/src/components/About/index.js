import './app.css'
import profilePic from '../../utilities/profile-pic.jpg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import resume from '../../utilities/Ahmad_Shaukat_resume.pdf'

const AboutMe =  () =>  {
    const history = useHistory()
    const user = useSelector((store) => store.session.user);

    if (!user) {
        history.push('/')
        return null
    }

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
                    <p className='about-me-text'>My name is Ahmad Shaukat. I graduated from AppAcademy in September 2023. I have more then two years of experience in designing building and deploying web applications. I built JobSphere as a personal solution to streamline my job search and efficiently track my interview progress. Among all the aspects of building this project, designing the frontend was the most enjoyable experience. Drawing from my experience, I've come to understand that users are most drawn to applications that offer a friendly and intuitive user interface. I firmly beleive that a user-friendly interface is a key to any successful application, and this belief drove my approach throughout the whole project.</p>
                </div>
            </div>

        </div>
        <div className="about-me-bottom">
            <a className='about-me-links about-me-portfolio' href='https://ahmadshaukat.click/' target='_blank'>Portfolio</a>
            <a className='about-me-links about-me-github' href='https://github.com/Ahmad-Shaukat' target='_blank'>GitHub</a>
            <a className='about-me-links about-me-resume' href={resume} target='_blank'>Resume</a>
        </div>
    </div>
    
    
    </>
}

export default AboutMe