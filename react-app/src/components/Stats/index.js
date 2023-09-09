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
  const [showDashboard, setShowDashboard] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
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
    } else {
      window.alert("Nothing to show");
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

              <p className="stats-text">Pending Interviews</p>
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

              <p className="stats-text">Scheduled Interviews</p>
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

              <p className="stats-text">Declined Interviews</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-declined">
                <FcCancel className="stats-declined-colors" />
              </div>
            </div>
          </div>
          <div className="stats-test stats-schduled-declined">
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
                  <h1>showInterviews</h1>
                  <button onClick={closeInterviewsHandle}>Close</button>
                  {showDateInterview.map((interview) => (
                    <div>{interview.position} </div>
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
                <div>
                  {" "}
                  <AddInterviewForm  />
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
