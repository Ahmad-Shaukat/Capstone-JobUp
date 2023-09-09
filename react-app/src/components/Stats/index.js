import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import interviewsReducer, {
  getAllInterviewsThunk,
} from "../../store/interview";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import "./app.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugins from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MdAdd } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import ShowGraph from "../testGraph";
import AddInterviewForm from "../InterviewForm";
import { MdAddCircle } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import {FcCancel} from 'react-icons/fc'
import {AiFillCheckSquare} from 'react-icons/ai'
import AllFavriteLists from "../AllFavoriteList";
import { FaLocationArrow } from "react-icons/fa";
import { BsCalendar2Week } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import calendar from "../Calander";

function Stats() {
  const dispatch = useDispatch();
  const history = useHistory();
  let state = useSelector((store) => store);
  let user = useSelector((store) => store.session["user"]);
  const [showInterviews, setShowInterviews] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showFavorites, setShowFavorites] = useState(true);
  const [showAddInterviewForm, setShowAddInterviewForm] = useState(false);
  const [showDateInterview, setShowDateInterview] = useState([])
  
  const hideFunc = false
  

  //   const events = []

  // console.log (state, '--------------------this is state')
  let interviews = useSelector((store) => store.interview);
  interviews = Object.values(interviews);

  // Format all the interviews to have new format

  const formatedInterview = interviews.map((interview) => {
    let initalDateString = interview.date;
    let initialDate = new Date(initalDateString.replace(/ GMT$/, ""));
    // we are using UTC so that time is not effected by different zones or day light saving
    let year = String(initialDate.getUTCFullYear());
    //  we are adding month because time objects return a zero based montths. and we are adding 0 as padding so instead of getting just 2 for februry we will get 02.
    let month = String(initialDate.getUTCMonth() + 1).padStart(2, "0");
    let day = String(initialDate.getUTCDate()).padStart("2", "0");
    let date = `${year}-${month}-${day}`;
    return { ...interview, date: date };
  });
  //   console.log (formatedInterview, '---------------------')
  // console.log(interviews, "-----------------yellah");
  // console.log(formatedInterview, "---------------formated");

  //   using map to make events array
  let events = formatedInterview.map((interview) => ({
    title: `${interview.company}: ${interview.status}`,
    date: interview.date,
  }));

  //   format the date for events using the date object

  const pendingInterviews = Object.values(interviews).filter(
    (interview) => interview.status === "Pending"
  );
  const scheduledInterviews = Object.values(interviews).filter(
    (interview) => interview.status === "Scheduled"
  );
  const declinedInterviews = Object.values(interviews).filter(
    (interview) => interview.status === "Declined"
  );
  const offeredInterview = Object.values(interviews).filter((interview) => interview.status ==='Offered')
  //   handleDateClicks function checks for inteveiws that are on this
  const handleDateClick = (args) => {
    // use array.some method to see if any interviews exsists on that date
    let hasInterviews = events.some((event) => {
      return event.date == args.dateStr;
    });
    if (hasInterviews) {
      console.log (args.dateStr, '-------------date')
      console.log (formatedInterview, '----------------------formatted ')
      const showTodays = formatedInterview.filter((interview) => interview.date == args.dateStr)
      console.log (showTodays)
      setShowDateInterview(showTodays)
      setShowInterviews(true);
      setShowDashboard(false);
      setShowFavorites(false)
      setShowAddInterviewForm(false);
    } else {
      setShowDashboard(false);
    setShowAddInterviewForm(true);
    setShowFavorites(false);
    setShowInterviews(false)
    }
  };
  // this functions controls the dashboard once user opens up the interviews through calander
  const closeInterviewsHandle = () => {
    setShowInterviews(false);
    setShowDashboard(true);
  };

  // this shows favorites

  const showFavoritesHandle = () => {
    setShowFavorites(true);
    setShowDashboard(false);
    setShowAddInterviewForm(false);
    setShowInterviews(false)
  };

  // this closes the favorites
  const closeFavoritesHandle = () => {
    setShowFavorites(false);
    setShowDashboard(true);
  };

  // this shows the signup Form
  const InterviewFormHandle = () => {
    setShowDashboard(false);
    setShowAddInterviewForm(true);
    setShowFavorites(false);
    setShowInterviews(false)
  };

  // closes the interview form
  const closeFormHandle = () => {
    setShowAddInterviewForm(false);
    setShowDashboard(true);
  };

  // show dashboard
  const showDashboardHandle = () => {
    setShowFavorites(false);
    setShowAddInterviewForm(false);
    setShowDashboard(true);
    setShowInterviews(false)
  };
  // console.log (pendingInterviews.length, 'these are pending interivew --------------')
  // console.log (scheduledInterviews.length, 'these are scheduled interviews')
  // console.log (declinedInterviews.length, 'these are declined interviews')

  // let pendingInterviews = interviews.filter(interview => interview['status'] = 'Pending')
  // console.log(pendingInterviews, '--------------these are pending ')
  // console.log (interviews, '--------------------')

  useEffect(async () => await dispatch(getAllInterviewsThunk()), [dispatch]);

  if (!user) {
    history.push("/");
    return null;
  }
  if (interviews) {
    return (
      <main className="stats-main-container">
        <div className="stats-card-main-container">
          <div className="stats-pending-container stats-pending-border">
            <div className="left-card-container">
              <div className="stats-number stats-pending-colors">
                <p>{pendingInterviews.length}</p>
              </div>

              <p className="stats-text">Pending</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-pending">
                <FaSuitcaseRolling className="stats-pending-colors" />
              </div>
            </div>
          </div>
          <div className="stats-test stats-schduled-border">
            <div className="left-card-container">
              <div className="stats-number">
                <p id="stats-scheduled-text">{scheduledInterviews.length}</p>
              </div>

              <p className="stats-text">Scheduled</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-scheduled">
                <FaCalendarCheck id="stats-scheduled-text" />
              </div>
            </div>
          </div>
          <div className="stats-test stats-schduled-declined">
            <div className="left-card-container">
              <div className="stats-number">
                <p className="stats-declined-colors">
                  {declinedInterviews.length}
                </p>
              </div>

              <p className="stats-text">Declined</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-declined">
                <FcCancel className="stats-declined-colors" />
              </div>
            </div>
          </div>
          <div className="stats-test stats-schduled-Offered">
            <div className="left-card-container">
              <div className="stats-number">
                <p className="stats-offered-colors">
                  {offeredInterview.length}
                </p>
              </div>

              <p className="stats-text">Offered </p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-offered">
                <AiFillCheckSquare className="stats-offered-colors" />
              </div>
            </div>
          </div>
        </div>
        <div className="main-stats-btm">
          <div className="calander-container">
            <div className="add-event-btn">
              <BiSolidDashboard
                className="stat-dash-icon"
                onClick={showDashboardHandle}
                id={showDashboard ? "selected" : ""}
              />

              <AiFillHeart
                className="stats-fav"
                onClick={showFavoritesHandle}
                id={showFavorites ? "selected" : ""}
              />

              <MdAddCircle
                onClick={InterviewFormHandle}
                className="add-int-stat"
                id={showAddInterviewForm ? "selected" : ""}
              />
            </div>
            <div className="calander">
              <FullCalendar
                id="calander2"
                className="my-calendar" // Add a className here
                plugins={[dayGridPlugin, timeGridPlugins, interactionPlugin]}
                dateClick={handleDateClick}
                initialView="dayGridMonth"
                headerToolbar={{
                  start: "today prev,next",
                  center: "title",
                  end: "dayGridMonth,timeGridWeek",
                }}
                events={events}
              />
            </div>
          </div>
          <div className="right-side-main">
            <div className="stats__sub">
              {showInterviews ? (
                <div className="showInterviews">
                  {showDateInterview.map((interview) => (
                    <div className="allInt-column allInt-column-stat">
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
                          {/* <button
                            className="allInt-edit-btn"
                            onClick={() => showHandle(interview)}
                          >
                            Edit
                          </button> */}
      
                          {/* <button className='allInt-edit-btn'>
                                              <OpenModalButton
                                                  buttonText={'Edit'}
                                                  
                                                  modalComponent={
                                                      <EditInterviewForm
                                                          interview={interview} id={interview.id}
                                                      />
                                                  }
                                              />
                                          </button> */}
      
                          {/* <button className="allInt-del-btn">
                            <OpenModalButton
                              buttonText={"Delete"}
                              modalComponent={
                                <DeleteInterview interview={interview} />
                              }
                            />
                          </button> */}
      
                          <NavLink exact to={`/interview/${interview.id}/detail`}>
                            <button className="allInt-btns-more">More</button>
                          </NavLink>
                        </div>
                      </div>
                      <div className="allInt-btm-right-container">
                        <p className="allInt-date">
                          <BsCalendar2Week className="allInt-int-logo" />
                          {interview["date"].slice(0, 17)}
                        </p>
                        {interview.status === "Pending" && (
                          <p className="allInt-Pending">{interview.status}</p>
                        )}
                        {interview.status === "Scheduled" && (
                          <p className="allInt-Scheduled">{interview.status}</p>
                        )}
                        {interview.status === "Declined" && (
                          <p className="allInt-Declined">{interview.status}</p>
                        )}
                        {interview.status === "Offered" && (
                          <p className="allInt-Offered">{interview.status}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                
              ) : null}

              {showDashboard ? (
                <div className="showDashboard">
                  <div className="graph-container">
                    <ShowGraph />{" "}
                  </div>
                </div>
              ) : null}
              {showFavorites ? (
                <div>
                 <AllFavriteLists stats={true} />
                  
                </div>
              ) : null}
              {showAddInterviewForm ? (
                <div className="showdashboard" >
                  <div className="testi">
                  {/* {" "} */}
                  <AddInterviewForm  />
                   </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Stats;
