import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllInterviews, getAllInterviewsThunk } from "../../store/interview";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getAllUsersInterviewThunk } from "../../store/allinterviews";
import { FaLocationArrow } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./app.css";
import userImage from "../../utilities/user_image.jpg";

const SingleUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();

  let interviews = useSelector((store) => store?.allinterviews);
  let allUsers = useSelector((store) => store?.user);

  let userProfile = {};
  for (let keys in allUsers) {
    if (allUsers[keys].id == id) {
      userProfile = allUsers[keys];
    }
  }

  let user = useSelector((store) => store?.session["user"]);
  interviews = Object.values(interviews);

  const userInterviews = interviews.filter(
    (interview) => Number(interview.userId) == id
  );

  useEffect(async () => dispatch(getAllUsersInterviewThunk()), [dispatch]);
  if (!user) {
    history.push("/");
    return null;
  }

  return (
    <>
      <div className="single-user-main-cont">
        <div className="single-usr-prfile-cont">
          <div className="single-user-upper">
            <img
              src={
                userProfile.image
                  ? `https://jobsphere.s3.amazonaws.com/${userProfile.image}`
                  : userImage
              }
            ></img>
          </div>
          <div className="single-user-btm">
            <p className="single-user-name">
              {" "}
              {userProfile.firstName === "N/A"
                ? "Name: Unavailable"
                : `${userProfile.firstName} ${userProfile.last_name}`}
            </p>
            <p className="">
              {" "}
              {userProfile.location === "N/A"
                ? "Location: Unavailable"
                : `${userProfile.location} $`}
            </p>
            <div>
              <p className="single-user-career">
                {userProfile.career === "N/A"
                  ? "Career: Unavailable"
                  : `${userProfile.career}`}
              </p>
            </div>
            <p className="single-user-bio">
              {userProfile.bio === "N/A"
                ? "Career: Unavailable"
                : `${userProfile.bio}`}
            </p>
            <p className="single-user-email">{userProfile.email}</p>
          </div>
        </div>
        <div className="allInt-container">
          {userInterviews.map((interview) => {
            return (
              <div className="allInt-column single">
                <div className="allInt-top-cont">
                  <div className="allInt-com-letter">
                    <p>{interview.company[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="allInt-com-pos">{interview.position}</p>
                    <p className="allInt-com-name">{interview.company}</p>
                  </div>
                </div>
                <div className="allInt-btm-container">
                  <div className="allInt-btm-left-cont">
                    <div className="allInt-loc-type-cont">
                      <p className="allInt-loc-text">
                        <FaLocationArrow className="allInt-loc-logo" />
                        {interview.location}
                      </p>
                      <p>
                        <MdWork className="allInt-type-logo" />
                        {interview.type}
                      </p>
                    </div>

                    <div className="allInt-btm-bttns">
                      <NavLink exact to={`/interview/${interview.id}/detail`}>
                        <button className="allInt-btns-more">More</button>
                      </NavLink>
                    </div>
                  </div>
                  <div className="allInt-btm-right-container">
                    {user.id === interview.userId && (
                      <p className="allInt-date">
                        <BsCalendar2Week className="allInt-int-logo" />
                        {interview["date"].slice(0, 17)}
                      </p>
                    )}
                    {interview.status === "Pending" && (
                      <p className="allInt-Pending">{interview.status}</p>
                    )}
                    {interview.status === "Scheduled" && (
                      <p className="allInt-Scheduled">{interview.status}</p>
                    )}
                    {interview.status === "Declined" && (
                      <p className="allInt-Declined">{interview.status}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>

  
  );
};

export default SingleUser;
